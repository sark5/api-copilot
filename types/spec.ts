// frontend/src/types/spec.ts

export interface UserStory {
  id: string;
  as_a: string;
  i_want: string;
  so_that: string;
  module: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  auth_required?: boolean;
  request_body?: any;
  response_body?: any;
  errors?: string[];
}

export interface DbColumn {
  name: string;
  type: string;
  constraints?: string;
}

export interface DbTable {
  table_name: string;
  columns: DbColumn[];
}

export interface SpecOutput {
  modules: string[];
  features_by_module: Record<string, string[]>;
  user_stories: UserStory[];
  api_endpoints: ApiEndpoint[];
  db_schema: DbTable[];
  open_questions: string[];
}
