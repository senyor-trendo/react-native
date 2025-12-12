export interface BookInfo {
	title: string;
	author: string;
	publication: string;
	edition: string;
	description: string;
	collection: string;
	summary: string;
	uniformTitle: string;
	isbn: string;
	imageUrl: string;
	permanentLink: string;
}
export interface BookStatus {
	location: string;
	locationLink: string;
	signature: string;
	status: string;
	notes: string;
}
export enum PageType{
	NoResults = "no-results", 
	Detail = "detail", 
	List = "list"
}
interface FieldLabels {
    author: string;
    collection: string;
    description: string;
    edition: string;
    isbn: string;
    pub: string;
    summary: string;
    title: string;
    uniformTitle: string;
	pageType:{
		noResults: string,
		list: string
	}
}
// Allow any string key (e.g., 'ca', 'en', 'es', 'fr', etc.)
export interface FieldTypes {
    [languageCode: string]: FieldLabels;
}