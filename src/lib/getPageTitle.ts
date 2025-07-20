export function getPageTitle(page: string): string {
  switch (page) {
    case "dashboard":
      return "Dashboard";
    case "inventory":
      return "Inventory";
    // add more as needed
    default:
      return "Restaurant App";
  }
}
