import { Phygital } from "./phygital";

export interface User {
  name?: string | null | undefined;
  address?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  claim_count: number | null | undefined;
  claims: Phygital[] | null;
}
