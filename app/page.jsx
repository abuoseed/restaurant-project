"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Truck, Leaf, Users, Phone, Mail } from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";

// Fallback data (used if no foods in Supabase)
const featuredFallback = [
  {
    id: 1,
    name: "Grilled Salmon",
    price: "$24.99",
    image: "/api/placeholder/300/200",
    description: "Fresh Atlantic salmon with herbs and lemon"
  },
  {
    id: 2,
    name: "Beef Burger",
    price: "$18.99",
    image: "/api/placeholder/300/200",
    description: "Juicy beef patty with fresh vegetables"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    price: "$16.99",
    image: "/api/placeholder/300/200",
    description: "Classic pizza with fresh mozzarella and basil"
  },
  {
    id: 4,
    name: "Chicken Pasta",
    price: "$19.99",
    image: "/api/placeholder/300/200",
    description: "Creamy pasta with grilled chicken breast"
  }
];

const whyChooseUs = [
  {
    icon: Star,
    title: "Quality Food",
    description: "We use only the finest ingredients"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service"
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Daily fresh produce from local farms"
  }
];

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing food and great service! The atmosphere is perfect for a romantic dinner.",
    image: "/api/placeholder/50/50"
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Best restaurant in town! The chef's special is absolutely delicious.",
    image: "/api/placeholder/50/50"
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment: "Fresh ingredients and excellent presentation. Highly recommended!",
    image: "/api/placeholder/50/50"
  }
];

export default function Home() {
  const [featured, setFeatured] = React.useState([]);

  React.useEffect(() => {
    let cancelled = false;
    async function loadFoods() {
      try {
        const res = await fetch("/api/foods", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) {
          const foods = Array.isArray(json.foods) ? json.foods : [];
          setFeatured(foods);
        }
      } catch {}
    }
    loadFoods();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
        <Image
            src="aboutphoto.jpg"
            alt="Delicious food"
            fill
            className="object-cover opacity-30"
         
          unoptimized
        />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Delicious Food, Fresh Ingredients, Great Experience
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Experience the finest culinary delights with traditional recipes and modern presentation
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild  size="lg" className="text-lg px-8 py-6  border-white/20 text-white hover:bg-white/20 hover:text-black">
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button asChild  size="lg" className="text-lg px-8 py-6  border-white/20 text-white hover:bg-white/20 hover:text-black">
              <Link href="/contact">Book a Table</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular dishes, carefully crafted with love and the finest ingredients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(featured.length ? featured.slice(0, 4) : featuredFallback).map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
          <Image
                      src={dish.image_url || "/api/placeholder/300/200"}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary">
                      {typeof dish.price === "number" ? `$${dish.price.toFixed(2)}` : dish.price}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                    <p className="text-muted-foreground mb-4">{dish.description}</p>
                    <Button className="w-full">Order Now</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {featured.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">
              No dishes found yet. Add foods in Supabase to see them here.
            </p>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing you with the best dining experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-lg bg-card border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
         <CustomerReviews/>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Great Food?</h2>
            <p className="text-xl mb-8 opacity-90">
              Book your table today and join us for an unforgettable dining experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">Book a Table</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/menu">View Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}