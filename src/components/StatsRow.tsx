"use client"

import { STATS } from "@/lib/constants"
import { Container } from "./Container"
import { motion } from "framer-motion"

export function StatsRow() {
  return (
    <section className="border-y bg-muted/50 py-8">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-green-500 md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}