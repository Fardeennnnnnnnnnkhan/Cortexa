import { buttonVariants } from '@/components/ui/button'
import { ClerkProvider as OriginakClerkProvider } from '@clerk/nextjs'
import {ReactNode} from 'react'

export function ClerkProvider({ children }: { children: ReactNode }) {
  return <OriginakClerkProvider
  appearance={
    {cssLayerName:"vendor",
      variables: {
        colorBackground: "var(--background)",
        borderRadius: "var(--radius-md)",
        colorBorder: "var(--border)",
        colorDanger: "var(--destructive)",
        colorForeground: "var(--foreground)",
        colorPrimary: "var(--primary)",
        colorPrimaryForeground: "var(--primary-foreground)",
        colorInput: "var(--background)",
        colorInputForeground: "var(--foreground)",
        colorMuted: "var(--muted)",
        colorMutedForeground: "var(--muted-foreground)",
        colorNeutral: "var(--secondary-foreground)",
        colorRing: "var(--ring)",
        colorShadow: "var(--shadow-color)",
        colorSuccess: "var(--primary)",
        colorWarning: "var(--warning)",
        fontFamily: "var(--font-sans)",
        fontFamilyButtons: "var(--font-sans)",
      },      
      elements: {
        pricingTableCard:
          "custom-pricing-table bg-none bg-[unset] border border-border p-6 my-3",
        pricingTableCardHeader: "p-0 pb-12",
        pricingTableCardTitle: "text-xl",
        pricingTableCardBody:
          "flex flex-col justify-end bg-none bg-[unset] *:bg-none *:bg-[unset] [&>.cl-pricingTableCardFeatures]:justify-items-end",
        pricingTableCardDescription: "text-muted-foreground text-sm mb-2",
        pricingTableCardFeeContainer: "items-baseline gap-0.5",
        pricingTableCardFee: "text-4xl",
        pricingTableCardFeePeriodNotice: "hidden",
        pricingTableCardFeePeriod: "text-base text-muted-foreground",
        pricingTableCardFeatures: "p-0 border-none",
        pricingTableCardFeaturesListItem: "[&>svg]:text-primary",
        pricingTableCardFeaturesListItemTitle: "text-sm",
        pricingTableCardFooter: "p-0 pt-8 border-none",
        pricingTableCardFooterButton: buttonVariants(),
      },
      
    }
  }
  >{children}</OriginakClerkProvider>
}