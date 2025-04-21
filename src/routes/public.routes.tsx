
import { RouteObject } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import HomePage from "@/pages/public/HomePage";
import AuthPage from "@/pages/public/AuthPage";
import WaitlistSignup from "@/pages/public/WaitlistSignup";
import Gameplay from "@/pages/gameplay";
import FAQPage from "@/pages/faq";
import About from "@/pages/about";
import Team from "@/pages/team";
import Contact from "@/pages/contact";
import PressKit from "@/pages/press-kit";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Cookies from "@/pages/cookies";
import AuthGuard from "@/components/auth/AuthGuard";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <AuthGuard requireAuth={false}><AuthPage /></AuthGuard> },
      { path: "/waitlist", element: <WaitlistSignup /> },
      { path: "/gameplay", element: <Gameplay /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/about", element: <About /> },
      { path: "/team", element: <Team /> },
      { path: "/contact", element: <Contact /> },
      { path: "/press-kit", element: <PressKit /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/cookies", element: <Cookies /> },
    ],
  },
];

