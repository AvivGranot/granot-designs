import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock Embla Carousel — jsdom lacks matchMedia, IntersectionObserver, ResizeObserver
vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, null],
  __esModule: true,
}));

import PortfolioCarousel from "../PortfolioCarousel";

const mockImages = [
  { src: "/img1.jpg", alt: "פרוייקט 1" },
  { src: "/img2.jpg", alt: "פרוייקט 2" },
  { src: "/img3.jpg", alt: "פרוייקט 3" },
  { src: "/dafna.jpg", alt: "פרוייקט דפנה" },
];

describe("PortfolioCarousel (Grid)", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders all images in a grid (not a carousel)", () => {
    render(<PortfolioCarousel images={mockImages} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockImages.length);
  });

  it("does NOT use setInterval (no auto-rotation)", () => {
    const spy = vi.spyOn(window, "setInterval");
    render(<PortfolioCarousel images={mockImages} />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("renders grid container with correct class", () => {
    const { container } = render(
      <PortfolioCarousel images={mockImages} />
    );
    expect(container.querySelector(".embla-container")).toBeInTheDocument();
  });

  it("first 3 images load eagerly, rest lazy", () => {
    render(<PortfolioCarousel images={mockImages} />);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("loading", "eager");
    expect(images[1]).toHaveAttribute("loading", "eager");
    expect(images[2]).toHaveAttribute("loading", "eager");
    expect(images[3]).toHaveAttribute("loading", "lazy");
  });

  it("dafna image has custom objectPosition", () => {
    render(<PortfolioCarousel images={mockImages} />);
    const images = screen.getAllByRole("img");
    const dafnaImg = images[3]; // last one has 'dafna' in src
    expect(dafnaImg.style.objectPosition).toBe("60% center");
  });

  it("non-dafna images have center objectPosition", () => {
    render(<PortfolioCarousel images={mockImages} />);
    const images = screen.getAllByRole("img");
    expect(images[0].style.objectPosition).toBe("center");
  });

  it("each grid item has correct aria-label", () => {
    render(<PortfolioCarousel images={mockImages} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute(
      "aria-label",
      "הצג פרוייקט 1 במסך מלא"
    );
  });

  // Lightbox tests
  describe("Lightbox", () => {
    it("lightbox is NOT visible initially", () => {
      render(<PortfolioCarousel images={mockImages} />);
      expect(
        screen.queryByLabelText("סגור")
      ).not.toBeInTheDocument();
    });

    it("clicking an image opens the lightbox", () => {
      render(<PortfolioCarousel images={mockImages} />);
      const gridItems = screen.getAllByRole("button");
      fireEvent.click(gridItems[0]);
      expect(screen.getByLabelText("סגור")).toBeInTheDocument();
    });

    it("lightbox shows correct image", () => {
      render(<PortfolioCarousel images={mockImages} />);
      const gridItems = screen.getAllByRole("button");
      fireEvent.click(gridItems[1]); // click second image
      // Lightbox img + grid imgs
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img2.jpg");
      expect(lightboxImg).toHaveAttribute("alt", "פרוייקט 2");
    });

    it("opening lightbox sets body overflow to hidden", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("close button closes the lightbox", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      expect(screen.getByLabelText("סגור")).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("סגור"));
      expect(
        screen.queryByLabelText("סגור")
      ).not.toBeInTheDocument();
    });

    it("closing lightbox restores body overflow", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      fireEvent.click(screen.getByLabelText("סגור"));
      expect(document.body.style.overflow).toBe("");
    });

    it("next button navigates forward", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      fireEvent.click(screen.getByLabelText("תמונה הבאה"));
      // Lightbox should show second image
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img2.jpg");
    });

    it("prev button navigates backward", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[1]); // start at index 1
      fireEvent.click(screen.getByLabelText("תמונה קודמת"));
      // Should navigate back to first image
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img1.jpg");
    });

    it("next wraps around from last to first", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[3]); // last image
      fireEvent.click(screen.getByLabelText("תמונה הבאה"));
      // Should wrap to first image
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img1.jpg");
    });

    it("prev wraps around from first to last", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]); // first image
      fireEvent.click(screen.getByLabelText("תמונה קודמת"));
      // Should wrap to last image
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/dafna.jpg");
    });

    it("Escape key closes lightbox", async () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      expect(screen.getByLabelText("סגור")).toBeInTheDocument();
      fireEvent.keyDown(window, { key: "Escape" });
      expect(
        screen.queryByLabelText("סגור")
      ).not.toBeInTheDocument();
    });

    it("ArrowRight key navigates to next image", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      fireEvent.keyDown(window, { key: "ArrowRight" });
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img2.jpg");
    });

    it("ArrowLeft key navigates to prev image", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[1]);
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img1.jpg");
    });

    it("keyboard events are ignored when lightbox is closed", () => {
      render(<PortfolioCarousel images={mockImages} />);
      // These should do nothing when lightbox is closed
      fireEvent.keyDown(window, { key: "Escape" });
      fireEvent.keyDown(window, { key: "ArrowRight" });
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      // No crash, lightbox still not open
      expect(
        screen.queryByLabelText("סגור")
      ).not.toBeInTheDocument();
    });

    it("clicking the overlay (outside content) closes lightbox", () => {
      render(<PortfolioCarousel images={mockImages} />);
      fireEvent.click(screen.getAllByRole("button")[0]);
      expect(screen.getByLabelText("סגור")).toBeInTheDocument();
      // Click the outer lightbox div
      const lightbox = document.querySelector(".portfolio-lightbox")!;
      fireEvent.click(lightbox);
      expect(
        screen.queryByLabelText("סגור")
      ).not.toBeInTheDocument();
    });
  });

  // Edge cases
  describe("Edge cases", () => {
    it("renders empty grid with no images", () => {
      const { container } = render(
        <PortfolioCarousel images={[]} />
      );
      expect(container.querySelector(".embla-container")).toBeInTheDocument();
      expect(screen.queryAllByRole("img")).toHaveLength(0);
    });

    it("renders correctly with a single image", () => {
      render(
        <PortfolioCarousel
          images={[{ src: "/single.jpg", alt: "single" }]}
        />
      );
      expect(screen.getAllByRole("img")).toHaveLength(1);
    });

    it("Enter key on grid item opens lightbox", () => {
      render(<PortfolioCarousel images={mockImages} />);
      const gridItems = screen.getAllByRole("button");
      fireEvent.keyDown(gridItems[2], { key: "Enter" });
      expect(screen.getByLabelText("סגור")).toBeInTheDocument();
      const allImages = screen.getAllByRole("img");
      const lightboxImg = allImages[allImages.length - 1];
      expect(lightboxImg).toHaveAttribute("src", "/img3.jpg");
    });
  });
});
