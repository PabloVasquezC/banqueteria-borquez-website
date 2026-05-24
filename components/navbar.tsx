"use client"

import { motion } from "framer-motion"

export function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 px-6 py-5 lg:px-8 lg:py-6"
    >
      <a href="#inicio" className="flex items-center group">
        <div className="flex flex-col items-start transition-transform duration-300 group-hover:scale-105">
          <img src="images/logo-borquez.webp" alt="Logo" className="max-w-[160px] max-h-[120px]" />
        </div>
      </a>
    </motion.div>
  )
}
