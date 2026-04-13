import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HeroSection from "../HeroSection";

// Mock image imports
vi.mock("@assets/portfolio1_1758398100598.jpg", () => ({
  default: "/mock-mobile-hero.jpg",
}));
vi.mock("@assets/PC_HomeScreen_1_1758787763058.jpg", () => ({
  default: "/mock-pc-hero.jpg",
}));

describe("HeroSection", () => {
  beforeEach(() => {
    // Default to desktop
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1024,
    });
  });

  it("renders a single static hero image (no carousel)", () => {
    render(<HeroSection />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
  });

  it("renders the hero container with correct test id", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("section-hero")).toBeInTheDocument();
  });

  it("hero image has fetchPriority=high for fast loading", () => {
    render(<HeroSection />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });

  it("renders CTA button linking to portfolio", () => {
    render(<HeroSection />);
    const cta = screen.getByText("לעבודות שלנו");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "#portfolio");
  });

  it("renders scroll indicator", () => {
    render(<HeroSection />);
    expect(screen.getByText("גללו למטה")).toBeInTheDocument();
  });

  it("scroll indicator has correct aria-label", () => {
    render(<HeroSection />);
    const indicator = screen.getByRole("button", {
      name: "גלול למטה לתיק עבודות",
    });
    expect(indicator).toBeInTheDocument();
  });

  it("CTA click calls scrollIntoView on portfolio section", () => {
    const mockScrollIntoView = vi.fn();
    const portfolioDiv = document.createElement("div");
    portfolioDiv.id = "portfolio";
    portfolioDiv.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(portfolioDiv);

    render(<HeroSection />);
    fireEvent.click(screen.getByText("לעבודות שלנו"));

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    document.body.removeChild(portfolioDiv);
  });

  it("does NOT have any setInterval (no auto-rotation)", () => {
    const spy = vi.spyOn(window, "setInterval");
    render(<HeroSection />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("shows PC image on desktop viewport", () => {
    Object.defineProperty(window, "innerWidth", { value: 1024 });
    render(<HeroSection />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/mock-pc-hero.jpg");
  });

  it("shows mobile image on mobile viewport", () => {
    Object.defineProperty(window, "innerWidth", { value: 375 });
    render(<HeroSection />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/mock-mobile-hero.jpg");
  });
});
