export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      approved_retrieval_completion_anchors: {
        Row: {
          approved_learning_design_identity: string
          approved_learning_design_snapshot: string
          completion_anchor_identity: string
          completed_at: string
          owner_id: string
          package_identity: string
          response_evaluation_contract_identity: string
          response_evaluation_contract_snapshot: string
          retrieval_interaction_identity: string
          terminal_interaction_digest: string
        }
        Insert: {
          approved_learning_design_identity: string
          approved_learning_design_snapshot: string
          completion_anchor_identity?: never
          completed_at?: never
          owner_id: string
          package_identity: string
          response_evaluation_contract_identity: string
          response_evaluation_contract_snapshot: string
          retrieval_interaction_identity: string
          terminal_interaction_digest: string
        }
        Update: {
          approved_learning_design_identity?: never
          approved_learning_design_snapshot?: never
          completion_anchor_identity?: never
          completed_at?: never
          owner_id?: never
          package_identity?: never
          response_evaluation_contract_identity?: never
          response_evaluation_contract_snapshot?: never
          retrieval_interaction_identity?: never
          terminal_interaction_digest?: never
        }
        Relationships: [
          {
            foreignKeyName: "approved_retrieval_completion_anchors_owner_id_package_identity_fkey"
            columns: ["owner_id", "package_identity"]
            isOneToOne: true
            referencedRelation: "approved_authority_packages"
            referencedColumns: ["owner_id", "package_identity"]
          },
        ]
      }
      approved_authority_packages: {
        Row: {
          created_at: string
          owner_id: string
          package_identity: string
          package_digest: string
          serialized_package: string
        }
        Insert: {
          created_at?: string
          owner_id: string
          package_identity: string
          package_digest: string
          serialized_package: string
        }
        Update: {
          created_at?: never
          owner_id?: never
          package_identity?: never
          package_digest?: never
          serialized_package?: never
        }
        Relationships: []
      }
      chapters: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          back_text: string
          created_at: string
          front_text: string
          id: string
          is_published: boolean
          lesson_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          back_text: string
          created_at?: string
          front_text: string
          id?: string
          is_published?: boolean
          lesson_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          back_text?: string
          created_at?: string
          front_text?: string
          id?: string
          is_published?: boolean
          lesson_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      later_retrieval_single_consumptions: {
        Row: {
          approved_learning_design_identity: string
          approved_learning_design_snapshot: string
          authenticated_owner_identity: string
          completion_anchor_identity: string
          completion_anchor_snapshot: string
          consumption_identity: string
          created_at: string
          later_retrieval_prerequisite_identity: string
          later_retrieval_prerequisite_snapshot: string
          persisted_approved_package_identity: string
        }
        Insert: {
          approved_learning_design_identity: string
          approved_learning_design_snapshot: string
          authenticated_owner_identity: string
          completion_anchor_identity: string
          completion_anchor_snapshot: string
          consumption_identity?: never
          created_at?: never
          later_retrieval_prerequisite_identity: string
          later_retrieval_prerequisite_snapshot: string
          persisted_approved_package_identity: string
        }
        Update: {
          approved_learning_design_identity?: never
          approved_learning_design_snapshot?: never
          authenticated_owner_identity?: never
          completion_anchor_identity?: never
          completion_anchor_snapshot?: never
          consumption_identity?: never
          created_at?: never
          later_retrieval_prerequisite_identity?: never
          later_retrieval_prerequisite_snapshot?: never
          persisted_approved_package_identity?: never
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean
          last_viewed_at: string
          lesson_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          last_viewed_at?: string
          lesson_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          last_viewed_at?: string
          lesson_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string
          content: string
          created_at: string
          id: string
          is_published: boolean
          learning_objectives: string[]
          slug: string
          sort_order: number
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          learning_objectives?: string[]
          slug: string
          sort_order?: number
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          learning_objectives?: string[]
          slug?: string
          sort_order?: number
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          explanation: string | null
          id: string
          is_published: boolean
          lesson_id: string
          options: string[]
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          explanation?: string | null
          id?: string
          is_published?: boolean
          lesson_id: string
          options: string[]
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          explanation?: string | null
          id?: string
          is_published?: boolean
          lesson_id?: string
          options?: string[]
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_later_retrieval_single_consumption_once: {
        Args: {
          p_approved_learning_design_identity: string
          p_approved_learning_design_snapshot: string
          p_authenticated_owner_identity: string
          p_completion_anchor_identity: string
          p_completion_anchor_snapshot: string
          p_later_retrieval_prerequisite_identity: string
          p_later_retrieval_prerequisite_snapshot: string
          p_persisted_approved_package_identity: string
        }
        Returns: {
          approved_learning_design_identity: string
          approved_learning_design_snapshot: string
          authenticated_owner_identity: string
          completion_anchor_identity: string
          completion_anchor_snapshot: string
          consumption_identity: string
          created_at: string
          later_retrieval_prerequisite_identity: string
          later_retrieval_prerequisite_snapshot: string
          persisted_approved_package_identity: string
        }[]
        SetofOptions: {
          from: "*"
          to: "later_retrieval_single_consumptions"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      create_retrieval_completion_anchor_once: {
        Args: { p_owner_id: string; p_package_identity: string; p_approved_learning_design_identity: string; p_approved_learning_design_snapshot: string; p_response_evaluation_contract_identity: string; p_response_evaluation_contract_snapshot: string; p_retrieval_interaction_identity: string; p_terminal_interaction_digest: string }
        Returns: Database["public"]["Tables"]["approved_retrieval_completion_anchors"]["Row"][]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
