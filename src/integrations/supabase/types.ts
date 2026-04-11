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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      catalog_skins: {
        Row: {
          created_at: string
          id: string
          skin_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          skin_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          skin_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "catalog_skins_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: true
            referencedRelation: "admin_skin_index"
            referencedColumns: ["source_skin_id"]
          },
          {
            foreignKeyName: "catalog_skins_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: true
            referencedRelation: "imported_skins"
            referencedColumns: ["id"]
          },
        ]
      }
      imported_skins: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
          pattern_name: string | null
          price: number | null
          rarity_color: string | null
          rarity_name: string | null
          weapon_name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          image?: string | null
          name: string
          pattern_name?: string | null
          price?: number | null
          rarity_color?: string | null
          rarity_name?: string | null
          weapon_name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          pattern_name?: string | null
          price?: number | null
          rarity_color?: string | null
          rarity_name?: string | null
          weapon_name?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          id: string
          skin_interest: string | null
          source: string
          whatsapp: string
        }
        Insert: {
          created_at?: string
          id?: string
          skin_interest?: string | null
          source?: string
          whatsapp: string
        }
        Update: {
          created_at?: string
          id?: string
          skin_interest?: string | null
          source?: string
          whatsapp?: string
        }
        Relationships: []
      }
      showcase_categories: {
        Row: {
          id: string
          key: string
          label: string
          slot_count: number
          sort_order: number
        }
        Insert: {
          id?: string
          key: string
          label: string
          slot_count?: number
          sort_order?: number
        }
        Update: {
          id?: string
          key?: string
          label?: string
          slot_count?: number
          sort_order?: number
        }
        Relationships: []
      }
      showcase_slots: {
        Row: {
          category_id: string
          created_at: string
          id: string
          skin_id: string | null
          slot_position: number
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          skin_id?: string | null
          slot_position: number
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          skin_id?: string | null
          slot_position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "showcase_slots_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "showcase_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "showcase_slots_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: false
            referencedRelation: "admin_skin_index"
            referencedColumns: ["source_skin_id"]
          },
          {
            foreignKeyName: "showcase_slots_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: false
            referencedRelation: "imported_skins"
            referencedColumns: ["id"]
          },
        ]
      }
      site_credentials: {
        Row: {
          description: string
          href: string | null
          icon: string
          id: string
          key: string
          sort_order: number
          title: string
          updated_at: string
          value: string
        }
        Insert: {
          description?: string
          href?: string | null
          icon?: string
          id?: string
          key: string
          sort_order?: number
          title: string
          updated_at?: string
          value: string
        }
        Update: {
          description?: string
          href?: string | null
          icon?: string
          id?: string
          key?: string
          sort_order?: number
          title?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          sort_order: number
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_skin_index: {
        Row: {
          image: string | null
          name: string | null
          pattern_name: string | null
          rarity_color: string | null
          rarity_name: string | null
          source_skin_id: string | null
          weapon_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
