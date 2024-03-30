import clsx from "clsx";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Check } from "lucide-react";
import { MovingBorderButton } from "../ui/moving-border";
import Link from "next/link";

const PricingCard = ({ card }: { card: PriceCard }) => {
  return (
    <Card
      className={clsx("w-[300px] flex flex-col justify-between py-3 relative", {
        "border-2 border-primary": card.title === "Unlimited Saas", // Add border to the card with the title "Unlimited Saas"
      })}
    >
      <CardHeader>
        <CardTitle className={clsx("", { "text-muted-foreground": card.title === "Unlimited Saas" })}>
          {card.title}
        </CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold">{card.price}</span>
        <span className="text-muted-foreground">/mo</span>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div>
          {card.features.map((feature) => (
            <div key={feature} className="flex gap-2 items-center">
              <Check className="text-muted-foreground" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
        {card.title === "Unlimited Saas" ? (
          <Link href={`/agency?plan=${card.priceId}`} className="w-full">
            <MovingBorderButton
              borderRadius="0.3rem"
              fullWidth
              duration={5000}
              height={null}
              className={clsx("w-full text-center bg-primary p-2 rounded-md", {
                "bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800":
                  card.title === "Unlimited Saas",
              })}
            >
              Get Started
            </MovingBorderButton>
          </Link>
        ) : (
          <Link
            href={`/agency?plan=${card.priceId}`}
            className={
              "w-full text-center bg-primary p-2 rounded-md hover:shadow-dark-tremor-brand-subtle hover:shadow-md border border-primary hover:border hover:border-blue-600 duration-150"
            }
          >
            Get Started
          </Link>
        )}
      </CardFooter>
      {card.title === "Unlimited Saas" && (
        <div className="-z-10 absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      )}
    </Card>
  );
};

export default PricingCard;
