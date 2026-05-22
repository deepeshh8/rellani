import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
          alt="Rellani Atelier"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white text-center">
            Our Story
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              Est. 2024
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-8 text-balance">
              Timeless Elegance for the Modern Woman
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              Rellani was born from a simple belief: that true style transcends
              trends. We create pieces that become the foundation of your
              wardrobe—thoughtfully designed, impeccably crafted, and made to be
              worn for years to come. Our collections celebrate the beauty of
              simplicity and the luxury of quality.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
                alt="Rellani Philosophy"
                fill
                className="object-cover"
              />
            </div>
            <div className="max-w-lg">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-6 text-balance">
                Less, But Better
              </h2>
              <div className="space-y-4 text-muted-foreground text-pretty">
                <p>
                  In a world of fast fashion and fleeting trends, we choose a
                  different path. Every Rellani piece is designed with intention—to
                  be versatile, to be lasting, to be loved.
                </p>
                <p>
                  We believe that a smaller wardrobe of exceptional pieces brings
                  more joy than a closet full of disposable items. Our designs focus
                  on clean lines, flattering silhouettes, and colors that work
                  together seamlessly.
                </p>
                <p>
                  This is quiet luxury: the confidence that comes from wearing
                  something truly well-made.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-16 lg:py-24 border-t border-border bg-secondary">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="max-w-lg order-2 md:order-1">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Craftsmanship
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-6 text-balance">
                Where Quality Meets Care
              </h2>
              <div className="space-y-4 text-muted-foreground text-pretty">
                <p>
                  Every Rellani garment begins with the finest materials. We source
                  silk from heritage mills in Italy, linen from the fields of
                  Belgium and France, and cashmere from the highlands of Mongolia.
                </p>
                <p>
                  Our pieces are crafted in small batches by skilled artisans who
                  share our commitment to excellence. Each garment passes through
                  dozens of hands before it reaches yours—cut with precision, sewn
                  with care, and finished with attention to every detail.
                </p>
                <p>
                  We don&apos;t compromise on quality. Ever.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] relative overflow-hidden order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80"
                alt="Rellani Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              Sustainability
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-6">
              Fashion That Respects Our World
            </h2>
            <p className="text-muted-foreground text-pretty">
              Sustainability isn&apos;t a trend for us—it&apos;s a responsibility.
              We&apos;re committed to minimizing our environmental impact while
              maximizing the longevity of every piece we create.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl">01</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Responsible Sourcing</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                We partner with certified suppliers who share our values.
                Our materials are traceable, ethical, and wherever possible,
                organic or recycled.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl">02</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Small Batch Production</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                We produce in limited quantities to reduce waste. When something
                sells out, we carefully consider whether to remake it—prioritizing
                quality over volume.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl">03</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Built to Last</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                The most sustainable garment is one you wear for years. We design
                timeless pieces and construct them to withstand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
                alt="Rellani Values"
                fill
                className="object-cover"
              />
            </div>
            <div className="max-w-lg">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-8 text-balance">
                What We Stand For
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Intentional Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Every piece serves a purpose. We design clothes that work
                    together, that transition from day to evening, that make
                    getting dressed simple and joyful.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Uncompromising Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    We obsess over the details because they matter. From the weight
                    of the fabric to the fall of the hem, everything is considered.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Inclusive Elegance</h3>
                  <p className="text-sm text-muted-foreground">
                    True style has no size limit. We&apos;re committed to expanding our
                    size range and creating pieces that make every woman feel
                    beautiful.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Transparent Practices</h3>
                  <p className="text-sm text-muted-foreground">
                    We believe you deserve to know where your clothes come from.
                    We&apos;re open about our supply chain, our pricing, and our impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl mb-6">
              Begin Your Rellani Journey
            </h2>
            <p className="text-background/80 mb-8 text-pretty">
              Discover timeless pieces designed to elevate your everyday. Each
              garment is crafted with care and built to become a cherished part of
              your wardrobe.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground text-sm hover:bg-background/90 transition-colors"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
