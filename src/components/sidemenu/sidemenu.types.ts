export interface Country {
    name: string;
    code: string;
}
export interface SidebarMenuProps {
    open: boolean;
    onClose: () => void
  }