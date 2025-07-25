
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Eye, Palette, Menu, X, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("all");
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Hydrating Vitamin C Serum",
      price: "$45",
      category: "skincare",
      skinType: ["all", "dry", "normal"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      description: "Brightening serum for all skin types"
    },
    {
      id: 2,
      name: "Matte Foundation SPF 30",
      price: "$38",
      category: "makeup",
      skinType: ["oily", "combination"],
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      description: "Long-lasting foundation with sun protection"
    },
    {
      id: 3,
      name: "Gentle Cleansing Oil",
      price: "$32",
      category: "skincare",
      skinType: ["all", "sensitive", "dry"],
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      description: "Removes makeup while nourishing skin"
    },
    {
      id: 4,
      name: "Luminous Highlighter Palette",
      price: "$28",
      category: "makeup",
      skinType: ["all"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
      description: "Multi-dimensional glow for every skin tone"
    },
    {
      id: 5,
      name: "Niacinamide Pore Refining Toner",
      price: "$26",
      category: "skincare",
      skinType: ["oily", "combination", "acne-prone"],
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
      description: "Minimizes pores and controls oil"
    },
    {
      id: 6,
      name: "Dewy Finish Setting Spray",
      price: "$24",
      category: "makeup",
      skinType: ["dry", "normal"],
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1583241800698-14828451b28d?w=400&h=400&fit=crop",
      description: "Sets makeup with a natural glow"
    }
  ];

  const skinTypes = [
    { id: "all", name: "All Skin Types", icon: "✨" },
    { id: "dry", name: "Dry", icon: "💧" },
    { id: "oily", name: "Oily", icon: "🌟" },
    { id: "combination", name: "Combination", icon: "⚖️" },
    { id: "sensitive", name: "Sensitive", icon: "🌸" },
    { id: "acne-prone", name: "Acne-Prone", icon: "🎯" }
  ];

  const getFilteredProducts = () => {
    if (selectedSkinType) {
      return products.filter(product => product.skinType.includes(selectedSkinType));
    }
    return activeSection === "all" 
      ? products 
      : products.filter(product => product.category === activeSection);
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    console.log(`Added ${product.name} to cart`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSkinTypeClick = (skinType) => {
    setSelectedSkinType(skinType.id);
    setActiveSection("all"); // Reset category filter when skin type is selected
    
    // Smooth scroll to products section
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTutorials = () => {
    navigate('/tutorials');
  };

  const handleSkinQuiz = () => {
    navigate('/skin-quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                GlowUp Beauty
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('skincare')} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Skincare
              </button>
              <button 
                onClick={() => scrollToSection('makeup')} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Makeup
              </button>
              <button 
                onClick={handleTutorials} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Tutorials
              </button>
              <button 
                onClick={handleSkinQuiz} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Skin Quiz
              </button>
              <Button 
                className="bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => console.log('Cart opened', cart)}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart ({cart.length})
              </Button>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('skincare')} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Skincare
              </button>
              <button 
                onClick={() => scrollToSection('makeup')} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Makeup
              </button>
              <button 
                onClick={handleTutorials} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Tutorials
              </button>
              <button 
                onClick={handleSkinQuiz} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Skin Quiz
              </button>
              <Button 
                className="bg-rose-500 hover:bg-rose-600 text-white w-full"
                onClick={() => console.log('Cart opened', cart)}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Beauty That</span>
                <br />
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Loves Your Skin
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover personalized skincare and makeup products designed for every skin type. 
                From gentle cleansers to bold lipsticks, we've got your beauty journey covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3"
                  onClick={() => scrollToSection('skincare')}
                >
                  Shop Skincare
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3"
                  onClick={() => scrollToSection('makeup')}
                >
                  Explore Makeup
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100 p-8">
                <img 
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop" 
                  alt="Beautiful woman with natural makeup"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-500">10k+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skin Type Guide */}
      <section className="py-16 bg-white" id="skin-types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h2>
            <p className="text-xl text-gray-600">Products tailored to your unique skin type</p>
            {selectedSkinType && (
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Badge variant="outline" className="text-rose-600 border-rose-300">
                  Showing products for: {skinTypes.find(type => type.id === selectedSkinType)?.name}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedSkinType(null)}
                  className="text-rose-600 hover:text-rose-700"
                >
                  Clear filter
                </Button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skinTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedSkinType === type.id ? 'ring-2 ring-rose-500 bg-rose-50' : ''
                }`}
                onClick={() => handleSkinTypeClick(type)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  {selectedSkinType === type.id && (
                    <ArrowDown className="h-4 w-4 mx-auto mt-2 text-rose-500 animate-bounce" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedSkinType ? `Perfect for ${skinTypes.find(type => type.id === selectedSkinType)?.name}` : 'Our Collections'}
            </h2>
            <div className="flex justify-center space-x-4 mb-8">
              <Button 
                variant={activeSection === "all" ? "default" : "outline"}
                onClick={() => {
                  setActiveSection("all");
                  setSelectedSkinType(null);
                }}
                className={activeSection === "all" ? "bg-rose-500 text-white" : ""}
              >
                All Products
              </Button>
              <Button 
                variant={activeSection === "skincare" ? "default" : "outline"}
                onClick={() => {
                  setActiveSection("skincare");
                  setSelectedSkinType(null);
                }}
                className={activeSection === "skincare" ? "bg-rose-500 text-white" : ""}
                id="skincare"
              >
                <Eye className="h-4 w-4 mr-2" />
                Skincare
              </Button>
              <Button 
                variant={activeSection === "makeup" ? "default" : "outline"}
                onClick={() => {
                  setActiveSection("makeup");
                  setSelectedSkinType(null);
                }}
                className={activeSection === "makeup" ? "bg-rose-500 text-white" : ""}
                id="makeup"
              >
                <Palette className="h-4 w-4 mr-2" />
                Makeup
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
            {getFilteredProducts().map((product, index) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className={product.category === "skincare" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}>
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-500">{product.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {getFilteredProducts().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for this skin type.</p>
              <Button 
                className="mt-4 bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => setSelectedSkinType(null)}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 bg-white" id="education">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Master Your Beauty Routine
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Step-by-Step Tutorials</h3>
                  <p className="text-gray-600">Learn the proper order and techniques for applying skincare and makeup products for best results.</p>
                </div>
                <div className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Pro Tips & Tricks</h3>
                  <p className="text-gray-600">Discover insider secrets and professional techniques to elevate your beauty routine.</p>
                </div>
                <div className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                  <p className="text-gray-600">Get customized advice based on your skin type and beauty goals.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={handleTutorials}
                >
                  View Complete Tutorials
                </Button>
                <Button 
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  onClick={handleSkinQuiz}
                >
                  Take Our Skin Quiz
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=300&h=400&fit=crop" 
                alt="Skincare routine"
                className="rounded-lg object-cover h-64"
              />
              <img 
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=400&fit=crop" 
                alt="Natural ingredients"
                className="rounded-lg object-cover h-64 mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-6 w-6 text-rose-400" />
                <span className="text-xl font-bold">GlowUp Beauty</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for personalized beauty and skincare solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection('skincare')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Skincare
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('makeup')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Makeup
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => console.log('New Arrivals clicked')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => console.log('Best Sellers clicked')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Best Sellers
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => console.log('Contact Us clicked')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleSkinQuiz} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Skin Quiz
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('education')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Beauty Tips
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => console.log('Returns clicked')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Returns
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest products and beauty tips.</p>
              <div className="flex space-x-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600 text-gray-400 hover:border-rose-400 hover:text-rose-400"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  Instagram
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600 text-gray-400 hover:border-rose-400 hover:text-rose-400"
                  onClick={() => window.open('https://tiktok.com', '_blank')}
                >
                  TikTok
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GlowUp Beauty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
