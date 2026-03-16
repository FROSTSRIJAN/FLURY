import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "10 Signs Your Dog Needs Professional Grooming",
    excerpt: "Learn the key indicators that your furry friend is overdue for a grooming session.",
    category: "Grooming",
    date: "Mar 10, 2026",
    readTime: "5 min read",
  },
  {
    title: "How to Choose the Right Pet Sitter",
    excerpt: "A comprehensive guide to finding the perfect caretaker for your pet when you're away.",
    category: "Pet Care",
    date: "Mar 5, 2026",
    readTime: "7 min read",
  },
  {
    title: "Essential Nutrition Tips for Puppies",
    excerpt: "Everything you need to know about feeding your new puppy for optimal health.",
    category: "Health",
    date: "Feb 28, 2026",
    readTime: "6 min read",
  },
  {
    title: "Training Your Cat: It's Easier Than You Think",
    excerpt: "Cats can be trained! Discover simple techniques that work for feline friends.",
    category: "Training",
    date: "Feb 20, 2026",
    readTime: "4 min read",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12 bg-furly-cream">
        <div className="furly-container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Furly <span className="furly-gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              Tips, guides, and stories for pet parents
            </p>
          </motion.div>
        </div>
      </section>

      <section className="furly-section">
        <div className="furly-container">
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="furly-card p-6 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-furly-peach text-primary text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-muted-foreground">· {post.readTime}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
