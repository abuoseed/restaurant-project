"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Clock, ChefHat, Heart } from "lucide-react";

// Sample data
const teamMembers = [
  {
    id: 1,
    name: "Chef Marco Rossi",
    role: "Head Chef",
    image: "ChefMarco.jpg",
    bio: "With over 15 years of experience in Italian cuisine, Chef Marco brings authentic flavors and innovative techniques to our kitchen.",
    specialties: ["Italian Cuisine", "Pasta Making", "Wine Pairing"]
  },
  {
    id: 2,
    name: "Chef Sarah Johnson",
    role: "Pastry Chef",
    image: "ChefSarah.jpg",
    bio: "Award-winning pastry chef specializing in French desserts and modern plating techniques.",
    specialties: ["French Pastries", "Chocolate Work", "Modern Desserts"]
  },
  {
    id: 3,
    name: "Chef David Chen",
    role: "Sous Chef",
    image: "ChefDavid.jpg",
    bio: "Expert in Asian fusion cuisine with a passion for fresh ingredients and bold flavors.",
    specialties: ["Asian Fusion", "Sushi", "Grilling"]
  }
];

const achievements = [
  {
    icon: Award,
    title: "Best Restaurant 2023",
    description: "Awarded by City Food Magazine"
  },
  {
    icon: Star,
    title: "5-Star Rating",
    description: "Consistently rated 5 stars by customers"
  },
  {
    icon: Users,
    title: "10,000+ Happy Customers",
    description: "Served over 10,000 satisfied customers"
  },
  {
    icon: Clock,
    title: "25+ Years Experience",
    description: "Over 25 years in the culinary industry"
  }
];

const galleryImages = [
  { id: 1, src: "images (1).jpg", alt: "Restaurant Interior" },
  { id: 2, src: "images (5).jpg", alt: "Kitchen View" },
  { id: 3, src: "images (2).jpg", alt: "Dining Area" },
  { id: 4, src: "images (3).jpg", alt: "Chef at Work" },
  { id: 5, src: "images (4).jpg", alt: "Fresh Ingredients" },
  { id: 6, src: "images (6).jpg", alt: "Beautiful Plating" }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
          <Image
            src="story.webp"
            alt="Restaurant interior"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
        </div>
        
        <div className="relative z-10 text-center text-primary/70 px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl te font-bold mb-6"
          >
            Our Story
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xl md:text-2xl text-primary/60"
          >
            Bringing you authentic flavors and unforgettable experiences since 1995
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Started in 1995, Delicious Restaurant began as a small family-owned establishment 
                  with a simple mission: to bring traditional recipes and fresh ingredients to our community.
                </p>
                <p>
                  What started as a humble kitchen has grown into a beloved dining destination, 
                  but we&apos;ve never lost sight of our roots. Every dish we serve is crafted with 
                  the same love and attention to detail that our founders brought to the table 25 years ago.
                </p>
                <p>
                  Today, we continue to honor traditional cooking methods while embracing modern 
                  techniques and seasonal ingredients. Our commitment to quality and authenticity 
                  remains unchanged, ensuring every meal is a memorable experience.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="aboutphoto.jpg"
                alt="Restaurant history"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition and awards that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg bg-card border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our talented chefs and staff who make every meal special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Restaurant Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a look inside our beautiful restaurant and kitchen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="ValuesPhoto.jpg"
                alt="Our values"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                unoptimized
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Passion for Food</h3>
                    <p className="text-muted-foreground">
                      We believe that great food comes from passion and dedication to the craft.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Ingredients</h3>
                    <p className="text-muted-foreground">
                      We source only the finest, freshest ingredients from trusted suppliers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
                    <p className="text-muted-foreground">
                      We&apos;re proud to be part of our local community and support local businesses.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Story</h2>
            <p className="text-xl mb-8 opacity-90">
              Come and taste the tradition, quality, and passion that defines Delicious Restaurant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <a href="/menu">View Our Menu</a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <a href="/contact">Book a Table</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
