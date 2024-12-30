export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  description: string;
  photo: {
    formats: {
      medium: {
        url: string;
      }
    }
  }
}