
import { VariantProps } from "class-variance-authority"
import * as React from "react"
import { sheetVariants } from "./sheet-variants"
import { sidebarMenuButtonVariants } from "./menu-button-variants"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof sheetVariants> {}

export interface SidebarMenuButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<any>
  variant?: VariantProps<typeof sidebarMenuButtonVariants>["variant"]
  size?: VariantProps<typeof sidebarMenuButtonVariants>["size"]
}
