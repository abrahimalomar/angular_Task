import { AttributeValue } from "./AttributeValue";
import { Translation } from "./Translation";

export interface Category {
    Id: number;
    Name: string;
    ParentId: number | null;
    Position: number;
    AttributeValues: AttributeValue[];
    ClonedCategories: any[];
    Translations: Translation[];
  
  }
  