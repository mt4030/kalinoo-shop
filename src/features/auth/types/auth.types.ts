export interface DemoCustomer {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthenticatedCustomer {
  id: string;
  email: string | null;
}

export type CustomerSession =
  | {
      mode: "guest";
      user: null;
    }
  | {
      mode: "demo";
      user: DemoCustomer;
    }
  | {
      mode: "authenticated";
      user: AuthenticatedCustomer;
    };