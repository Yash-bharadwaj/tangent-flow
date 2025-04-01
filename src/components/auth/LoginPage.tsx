import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, UserPlus, LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "./AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("LoginPage: isAuthenticated =", isAuthenticated);
    if (isAuthenticated) {
      console.log("Login page detected authenticated user, navigating to home");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting login with:", email);
      
      if (!email || !password) {
        toast.error("Please enter both email and password");
        setIsLoading(false);
        return;
      }
      
      await login(email, password);
      // Auth provider will handle the redirect
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed: " + (error.message || "Unknown error"));
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting registration with:", email, fullName);
      
      if (!email || !password || !fullName) {
        toast.error("Please fill out all fields");
        setIsLoading(false);
        return;
      }
      
      await register(email, password, { full_name: fullName, role: "customer" });
      
      toast.success("Registration successful! Please log in.");
      setActiveTab("login");
      setPassword(""); // Clear password for security
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Registration failed: " + (error.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = async () => {
    setEmail("demo@example.com");
    setPassword("password123");
    // Use timeout to ensure state is updated before login
    setTimeout(() => {
      document.getElementById("login-form")?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }, 100);
  };
  
  const handleAdminLogin = async () => {
    setEmail("admin@example.com");
    setPassword("admin123");
    // Use timeout to ensure state is updated before login
    setTimeout(() => {
      document.getElementById("login-form")?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pattern-waves-bg">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Layers className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Tangent Flow</CardTitle>
          <CardDescription className="text-center">
            Access the dashboard to manage your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form id="login-form" onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : (
                      <div className="flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : (
                      <div className="flex items-center">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Account
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full grid grid-cols-2 gap-2 mb-3">
            <Button variant="outline" onClick={handleDemoLogin} type="button">
              Login as Demo
            </Button>
            <Button variant="outline" onClick={handleAdminLogin} type="button">
              Login as Admin
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-semibold">Demo credentials:</span><br />
            Email: demo@example.com<br />
            Password: password123<br /><br />
            Admin Email: admin@example.com<br />
            Admin Password: admin123
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
