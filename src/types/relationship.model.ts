export type RelationshipCategoryKey = '가족' | '연인' | '친구' | '동료' | '적';

export type RelationshipMap = Partial<Record<RelationshipCategoryKey, string[]>>;
