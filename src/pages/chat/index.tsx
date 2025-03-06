import { useState, useEffect, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

const socket = io("http://localhost:3009", {
  withCredentials: true,
  transports: ["websocket"],
});

interface Message {
  id: string;
  name: string;
  sender?: string;
  consultorId: string;
  clienteId: string;
  text: string;
  targetUserId: string,
  targetRole: 'cliente' | 'consultor'
}

interface Conversation {
  id: string;
  name: string;
  clientSender: string;
  sender?: string;
  messages: Message[];
}


interface Payload {
  name: string;
  sender?: string;
  consultorId: string;
  clienteId: string;
  text: string;
  targetUserId: string,
  targetRole: 'cliente' | 'consultor'
}

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [consultorId, setConsultorId] = useState("255"); // Id fixo ou vindo do sistema
  const [nameConsultor, setNameConsultor] = useState("Consultor Luiz");

  useEffect(() => {
    console.log("Registrando consultor...");
    socket.emit("register", {
      userId: 255,
      role: "consultor",
      consultorId,
      clientId: "255",
      name: nameConsultor,
    });
  
    socket.on("conversationList", (history) => {
      console.log("Histórico de conversa recebido:", history);
      if (history && history.data) {
        const formattedConversations = history.data.map((convo: any) => ({
          id: convo._id,
          clientSender: convo.clienteId,
          name: convo.nomeCliente,
          messages: convo.messages.map((msg: any) => ({
            id: msg.id,
            consultorId: convo.consultorId,
            name: msg.name,
            text: msg.text,
            clienteId: convo.clienteId,
            targetRole: "cliente",
            targetUserId: convo.client
          })),
        }));
        setConversations(formattedConversations);
      }
    });
  
    socket.on("msgToClient", (message: Payload) => {
      console.log("Mensagem recebida no consultor:", message);
      setConversations( (prev) => {
        
        const updatedConversations = [...prev];
        console.log(updatedConversations);
        console.log(message);
        const clientConversation = updatedConversations.find(
          (convo) => convo.clientSender === message.clienteId
        );
  
        if (clientConversation) {
          clientConversation.messages.push({
            id: uuidv4(),
            consultorId,
            name: message.name,
            text: message.text,
            clienteId: message.clienteId,
            targetRole: "cliente",
            targetUserId: message.clienteId
          });
        } else {
          updatedConversations.push({
            id: uuidv4(),
            clientSender: message.sender,
            messages: [
              {
                id: uuidv4(),
                consultorId,
                name: message.name,
                text: message.text,
                clienteId: message.clienteId,
                targetRole: "cliente",
                targetUserId: message.clienteId
              },
            ],
            name: message.name,
          });
        }
  
        return updatedConversations;
      });
    });
  
    return () => {
      console.log("Removendo listener do consultor...");
      socket.off("msgToClient");
    };
  }, [consultorId]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (currentConversation && newMessage.trim()) {
      const message: Payload = {
        name: nameConsultor,
        text: newMessage,
        consultorId,
        clienteId: currentConversation.messages[0].clienteId,
        targetUserId: currentConversation.messages[0].clienteId,
        targetRole:'cliente'
      };
    
      console.log("Enviando mensagem para o cliente:", currentConversation.clientSender);
      console.log(currentConversation);

      // Emitir a mensagem para o servidor
      socket.emit("msgToServer", message);
  
      // Atualizar o estado local
      setConversations((prev) => {
        const updatedConversations = [...prev];
        const clientConversation = updatedConversations.find(
          (convo) => convo.clientSender === currentConversation.clientSender
        );
  
        if (clientConversation) {
          clientConversation.messages.push({
            id: uuidv4(),
            consultorId,
            name: nameConsultor,
            text: newMessage,
            clienteId: currentConversation.messages[0].clienteId,
            targetRole: "cliente",
            targetUserId: currentConversation.messages[0].clienteId
          });
        } else {
          updatedConversations.push({
            id: uuidv4(),
            clientSender: currentConversation.clientSender,
            messages: [
              {
                id: uuidv4(),
                consultorId,
                name: nameConsultor,
                text: newMessage,
                clienteId: currentConversation.messages[0].clienteId,
                targetRole: "cliente",
                targetUserId: currentConversation.messages[0].clienteId
              },
            ],
            name: nameConsultor,
          });
        }
  
        return updatedConversations;
      });

      /* (prev) =>
        prev.map((convo) =>
          convo.id === currentConversation.id
            ? { ...convo, 
              messages: [...convo.messages, { id: uuidv4(),...message }] }
            : convo
        )
       */
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4 h-screen">
      <div className="flex space-x-4 h-full">
        {/* Lista de Conversas */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg flex flex-col">
          <h3 className="font-semibold mb-2">Lista de Conversas</h3>
          <ul className="space-y-2 overflow-y-auto max-h-[calc(100%-3rem)]">
            {conversations.map((convo) => (
              <li
                key={convo.id}
                className="cursor-pointer border p-2 rounded-md hover:bg-gray-200"
                onClick={() => setCurrentConversation(convo)}
              >
                {convo.name || "Cliente Anônimo"}
              </li>
            ))}
          </ul>
        </div>

        {/* Área de Mensagens */}
        <div className="w-3/4 bg-white p-4 rounded-lg shadow-md flex flex-col">
          {currentConversation ? (
            <>
              <h3 className="text-xl font-semibold">
                Conversa com {currentConversation.name}
              </h3>
              <div className="space-y-2 mt-4 flex-1 overflow-y-auto max-h-[calc(100%-6rem)]">
                {currentConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      msg.name === nameConsultor ? "text-right" : "text-left"
                    }
                  >
                    <p
                      className={
                        msg.name === nameConsultor
                          ? "bg-blue-100 p-2 rounded-lg"
                          : "bg-gray-100 p-2 rounded-lg"
                      }
                    >
                      <strong>{msg.name}:</strong> {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSendMessage}
                className="mt-4 flex space-x-2"
              >
                <input
                  type="text"
                  className="flex-1 border border-gray-300 p-2 rounded-lg"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite uma mensagem..."
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Enviar
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-gray-500 flex-1">
              Selecione uma conversa
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
