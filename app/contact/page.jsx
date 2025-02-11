"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, Input, Textarea, Button, useDisclosure } from "@nextui-org/react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Show success message (you can implement a toast notification here)
      alert("Message sent successfully!");
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "support@tzelectro.com",
      href: "mailto:support@tzelectro.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+1-234-567-8900",
      href: "tel:+1-234-567-8900",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "Your Address Here",
      href: "https://maps.google.com/?q=YourAddress",
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com/tzelectro",
      label: "Facebook",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/tzelectro",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/tzelectro",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/company/tzelectro",
      label: "LinkedIn",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our LED products? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="bordered"
                  isRequired
                />
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="bordered"
                  isRequired
                />
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  variant="bordered"
                  isRequired
                />
                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  variant="bordered"
                  minRows={6}
                  isRequired
                />
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="p-8">
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="text-blue-600">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{info.label}</p>
                        <Link 
                          href={info.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                        >
                          {info.value}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Social Media Links */}
              <Card className="p-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Connect With Us</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300 group"
                      >
                        <div className="text-blue-600">
                          {social.icon}
                        </div>
                        <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                          {social.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
