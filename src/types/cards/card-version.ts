
import { GameCard } from "../cards";

export interface CardVersion<T extends GameCard = GameCard> {
  id: string;
  cardId: string;
  versionNumber: number;
  timestamp: string;
  data: T;
  changedBy: string;
  notes?: string;
}

export interface CardChangeRecord {
  id: string;
  cardId: string;
  timestamp: string;
  fieldName: string;
  oldValue: any;
  newValue: any;
  changedBy: string;
}

export type CardChangeSet = {
  [cardId: string]: {
    [fieldName: string]: {
      oldValue: any;
      newValue: any;
    }
  }
};

export interface CardBulkEditOperation {
  id: string;
  timestamp: string;
  affectedCards: string[];
  changes: CardChangeSet;
  notes?: string;
  status: 'draft' | 'pending' | 'applied' | 'rejected';
  appliedAt?: string;
}

export interface CardImportResult {
  imported: number;
  updated: number;
  failed: number;
  errors: {
    cardId?: string;
    name: string;
    error: string;
  }[];
}
