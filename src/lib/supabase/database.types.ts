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
      corsets_sieges: {
        Row: {
          annee_renouvellement: number | null
          commentaires: string | null
          created_at: string
          date_livraison: string | null
          materiel_id: string
          orthoprothesiste: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          annee_renouvellement?: number | null
          commentaires?: string | null
          created_at?: string
          date_livraison?: string | null
          materiel_id: string
          orthoprothesiste?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          annee_renouvellement?: number | null
          commentaires?: string | null
          created_at?: string
          date_livraison?: string | null
          materiel_id?: string
          orthoprothesiste?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "corsets_sieges_materiel_id_fkey"
            columns: ["materiel_id"]
            isOneToOne: true
            referencedRelation: "materiels_fauteuil_roulant"
            referencedColumns: ["materiel_id"]
          },
        ]
      }
      maisons: {
        Row: {
          created_at: string
          id: string
          nom: string
          numero: number
          position: number
          slug: string
          type: Database["public"]["Enums"]["maison_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          nom: string
          numero: number
          position: number
          slug: string
          type?: Database["public"]["Enums"]["maison_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string
          numero?: number
          position?: number
          slug?: string
          type?: Database["public"]["Enums"]["maison_type"]
          updated_at?: string
        }
        Relationships: []
      }
      materiel_mouvements: {
        Row: {
          commentaire: string | null
          created_at: string
          created_by: string | null
          date_retour_prevue: string | null
          id: string
          materiel_id: string
          personne_apres_id: string | null
          personne_avant_id: string | null
          piece_apres_id: string | null
          piece_avant_id: string | null
          type: Database["public"]["Enums"]["mouvement_type"]
        }
        Insert: {
          commentaire?: string | null
          created_at?: string
          created_by?: string | null
          date_retour_prevue?: string | null
          id?: string
          materiel_id: string
          personne_apres_id?: string | null
          personne_avant_id?: string | null
          piece_apres_id?: string | null
          piece_avant_id?: string | null
          type: Database["public"]["Enums"]["mouvement_type"]
        }
        Update: {
          commentaire?: string | null
          created_at?: string
          created_by?: string | null
          date_retour_prevue?: string | null
          id?: string
          materiel_id?: string
          personne_apres_id?: string | null
          personne_avant_id?: string | null
          piece_apres_id?: string | null
          piece_avant_id?: string | null
          type?: Database["public"]["Enums"]["mouvement_type"]
        }
        Relationships: [
          {
            foreignKeyName: "materiel_mouvements_materiel_id_fkey"
            columns: ["materiel_id"]
            isOneToOne: false
            referencedRelation: "materiels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiel_mouvements_personne_apres_id_fkey"
            columns: ["personne_apres_id"]
            isOneToOne: false
            referencedRelation: "personnes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiel_mouvements_personne_avant_id_fkey"
            columns: ["personne_avant_id"]
            isOneToOne: false
            referencedRelation: "personnes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiel_mouvements_piece_apres_id_fkey"
            columns: ["piece_apres_id"]
            isOneToOne: false
            referencedRelation: "pieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiel_mouvements_piece_avant_id_fkey"
            columns: ["piece_avant_id"]
            isOneToOne: false
            referencedRelation: "pieces"
            referencedColumns: ["id"]
          },
        ]
      }
      materiels: {
        Row: {
          commentaire: string | null
          created_at: string
          date_achat: string | null
          duree_vie_annees: number | null
          id: string
          modele: string
          nom: string | null
          numero_mas: string | null
          numero_serie: string | null
          personne_id: string | null
          piece_id: string
          reference: string | null
          type: Database["public"]["Enums"]["materiel_type"]
          updated_at: string
        }
        Insert: {
          commentaire?: string | null
          created_at?: string
          date_achat?: string | null
          duree_vie_annees?: number | null
          id?: string
          modele: string
          nom?: string | null
          numero_mas?: string | null
          numero_serie?: string | null
          personne_id?: string | null
          piece_id: string
          reference?: string | null
          type: Database["public"]["Enums"]["materiel_type"]
          updated_at?: string
        }
        Update: {
          commentaire?: string | null
          created_at?: string
          date_achat?: string | null
          duree_vie_annees?: number | null
          id?: string
          modele?: string
          nom?: string | null
          numero_mas?: string | null
          numero_serie?: string | null
          personne_id?: string | null
          piece_id?: string
          reference?: string | null
          type?: Database["public"]["Enums"]["materiel_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materiels_personne_id_fkey"
            columns: ["personne_id"]
            isOneToOne: false
            referencedRelation: "personnes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiels_piece_id_fkey"
            columns: ["piece_id"]
            isOneToOne: false
            referencedRelation: "pieces"
            referencedColumns: ["id"]
          },
        ]
      }
      materiels_entretiens: {
        Row: {
          commentaires: string | null
          created_at: string
          date: string
          id: string
          materiel_id: string
          par_qui: string | null
          prix_centimes: number | null
        }
        Insert: {
          commentaires?: string | null
          created_at?: string
          date: string
          id?: string
          materiel_id: string
          par_qui?: string | null
          prix_centimes?: number | null
        }
        Update: {
          commentaires?: string | null
          created_at?: string
          date?: string
          id?: string
          materiel_id?: string
          par_qui?: string | null
          prix_centimes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "materiels_entretiens_materiel_id_fkey"
            columns: ["materiel_id"]
            isOneToOne: false
            referencedRelation: "materiels"
            referencedColumns: ["id"]
          },
        ]
      }
      materiels_fauteuil_roulant: {
        Row: {
          accessoires: string | null
          appartenance: string | null
          created_at: string
          materiel_id: string
          prestataire: string | null
          taille: string | null
          type_fauteuil: string | null
          updated_at: string
        }
        Insert: {
          accessoires?: string | null
          appartenance?: string | null
          created_at?: string
          materiel_id: string
          prestataire?: string | null
          taille?: string | null
          type_fauteuil?: string | null
          updated_at?: string
        }
        Update: {
          accessoires?: string | null
          appartenance?: string | null
          created_at?: string
          materiel_id?: string
          prestataire?: string | null
          taille?: string | null
          type_fauteuil?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materiels_fauteuil_roulant_materiel_id_fkey"
            columns: ["materiel_id"]
            isOneToOne: true
            referencedRelation: "materiels"
            referencedColumns: ["id"]
          },
        ]
      }
      personnes: {
        Row: {
          created_at: string
          id: string
          lien: string | null
          nom: string
          piece_id: string | null
          prenom: string
          type: Database["public"]["Enums"]["personne_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lien?: string | null
          nom: string
          piece_id?: string | null
          prenom: string
          type?: Database["public"]["Enums"]["personne_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lien?: string | null
          nom?: string
          piece_id?: string | null
          prenom?: string
          type?: Database["public"]["Enums"]["personne_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "personnes_piece_id_fkey"
            columns: ["piece_id"]
            isOneToOne: false
            referencedRelation: "pieces"
            referencedColumns: ["id"]
          },
        ]
      }
      pieces: {
        Row: {
          created_at: string
          id: string
          maison_id: string
          nom: string
          position: number
          type: Database["public"]["Enums"]["piece_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          maison_id: string
          nom: string
          position: number
          type: Database["public"]["Enums"]["piece_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          maison_id?: string
          nom?: string
          position?: number
          type?: Database["public"]["Enums"]["piece_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pieces_maison_id_fkey"
            columns: ["maison_id"]
            isOneToOne: false
            referencedRelation: "maisons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      record_materiel_mouvement: {
        Args: {
          p_commentaire?: string
          p_date_retour_prevue?: string
          p_materiel_id: string
          p_personne_apres_id?: string
          p_piece_apres_id: string
          p_type?: Database["public"]["Enums"]["mouvement_type"]
        }
        Returns: {
          commentaire: string | null
          created_at: string
          created_by: string | null
          date_retour_prevue: string | null
          id: string
          materiel_id: string
          personne_apres_id: string | null
          personne_avant_id: string | null
          piece_apres_id: string | null
          piece_avant_id: string | null
          type: Database["public"]["Enums"]["mouvement_type"]
        }
        SetofOptions: {
          from: "*"
          to: "materiel_mouvements"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      maison_type: "habitation" | "stockage"
      materiel_type:
        | "materiel_transfert"
        | "brancard_douche"
        | "baignoire"
        | "lit"
        | "matelas"
        | "fauteuil_roulant"
        | "chaise_douche"
        | "wc"
      mouvement_type:
        | "deplacement"
        | "pret"
        | "retour"
        | "perte"
        | "casse"
        | "reparation"
      personne_type: "interne" | "externe"
      piece_type:
        | "chambre"
        | "salle_de_bain"
        | "salle_de_vie"
        | "cuisine"
        | "autre"
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
      maison_type: ["habitation", "stockage"],
      materiel_type: [
        "materiel_transfert",
        "brancard_douche",
        "baignoire",
        "lit",
        "matelas",
        "fauteuil_roulant",
        "chaise_douche",
        "wc",
      ],
      mouvement_type: [
        "deplacement",
        "pret",
        "retour",
        "perte",
        "casse",
        "reparation",
      ],
      personne_type: ["interne", "externe"],
      piece_type: [
        "chambre",
        "salle_de_bain",
        "salle_de_vie",
        "cuisine",
        "autre",
      ],
    },
  },
} as const
