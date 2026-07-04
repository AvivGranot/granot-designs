import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./components/HomePage";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Design variants under review — hidden routes, noindex, not linked from the homepage
const V1Contra = lazy(() => import("./components/variants/V1Contra"));
const V2Craftsman = lazy(() => import("./components/variants/V2Craftsman"));
const V3Gallery = lazy(() => import("./components/variants/V3Gallery"));
const V4Process = lazy(() => import("./components/variants/V4Process"));
const V5Heritage = lazy(() => import("./components/variants/V5Heritage"));
const V6Architect = lazy(() => import("./components/variants/V6Architect"));
const V7Immersive = lazy(() => import("./components/variants/V7Immersive"));
const V8Bento = lazy(() => import("./components/variants/V8Bento"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/v1" component={V1Contra} />
        <Route path="/v2" component={V2Craftsman} />
        <Route path="/v3" component={V3Gallery} />
        <Route path="/v4" component={V4Process} />
        <Route path="/v5" component={V5Heritage} />
        <Route path="/v6" component={V6Architect} />
        <Route path="/v7" component={V7Immersive} />
        <Route path="/v8" component={V8Bento} />
        <Route path="/" component={HomePage} />
        <Route path="*" component={HomePage} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
