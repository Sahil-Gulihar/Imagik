'use client'
import Image from "next/image";
import { useState } from "react";
import { Cards } from '../components/cards'
import Navbar  from '../components/navbar'

export default function Home() {
 
  return (
    <main>
    <Navbar />
     <Cards />
    </main>
  );
}
