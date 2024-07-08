import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Router from 'next/router'

export function Header() {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      name: 'Lista de Clientes',
      link: '/',
    },
    {
      id: 2,
      name: 'Lista de Endereços',
      link: '/enderecos',
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-violet-950 fixed z-50">
      <div>
        <h1 className="text-5xl font-signature ml-2">Project</h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, name }) => (
          <li key={id} className="px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-gray-200 duration-200">
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>

      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-violet-950 to-gray-800 text-gray-200">
          {links.map(({ id, link, name }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <Link href={link} onClick={() => {Router.push(`/${link}`)}}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
