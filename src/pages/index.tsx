import { useContext, useState } from 'react';
import { AuthContexts } from '../contexts/AuthContexts';
import Head from 'next/head';
import styles from '../../styles/styles.module.scss'
import { Header } from '@/component/header';

export default function Home() {
 
  return (
    <div>
      <Header/>
      <h1>teste</h1>
    </div>
  );
}
