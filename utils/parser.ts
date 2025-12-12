import { FIELDS } from "./parser.config";
import { BookInfo, BookStatus, PageType } from "./parser.model";

export function checkPageType(html:string, language:string): PageType{
	if(html.indexOf(FIELDS[language].pageType.noResults) !== -1){
		return PageType.NoResults;
	}
	else if(html.indexOf(FIELDS[language].pageType.list) !== -1){
		return PageType.List;
	}

	return PageType.Detail;
}

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
	const entityMap: { [key: string]: string } = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'",
		'&nbsp;': ' ',
		'&aacute;': 'á',
		'&eacute;': 'é',
		'&iacute;': 'í',
		'&oacute;': 'ó',
		'&uacute;': 'ú',
		'&ntilde;': 'ñ',
		'&ccedil;': 'ç',
		'&egrave;': 'è',
		'&agrave;': 'à',
		'&igrave;': 'ì',
		'&ograve;': 'ò',
		'&ugrave;': 'ù',
		'&uuml;': 'ü',
		'&ldquo;': '"',
		'&rdquo;': '"',
		'&lsquo;': "'",
		'&rsquo;': "'"
	};

	return text.replace(/&[a-z0-9#]+;/gi, (match) => {
		// Handle numeric entities
		if (match.startsWith('&#x')) {
			const hex = match.substring(3, match.length - 1);
			try {
				return String.fromCharCode(parseInt(hex, 16));
			} catch {
				return match;
			}
		} else if (match.startsWith('&#')) {
			const dec = match.substring(2, match.length - 1);
			try {
				return String.fromCharCode(parseInt(dec, 10));
			} catch {
				return match;
			}
		}
		return entityMap[match.toLowerCase()] || match;
	});
}

// Helper function to clean HTML tags from text
function stripHtmlTags(text: string): string {
	return text.replace(/<[^>]*>/g, '');
}

// Helper function to extract text by label in tables
function extractByLabel(html: string, label: string): string {
	// Pattern to find the label and its corresponding data cell
	const pattern = new RegExp(
		`class="bibInfoLabel"[^>]*>\\s*${label}\\s*<[^>]*>[^<]*<td[^>]*class="bibInfoData"[^>]*>([\\s\\S]*?)</td>`,
		'i'
	);

	const match = html.match(pattern);
	if (match && match[1]) {
		const content = match[1];
		// Clean the content
		const cleaned = stripHtmlTags(content).trim();
		return decodeHtmlEntities(cleaned);
	}

	return '';
}

// Main function to extract book info
export function extractBookInfo(html: string, language: string = 'ca'): BookInfo {
	const fields = FIELDS[language];

	const title = extractByLabel(html, fields.title);
	const author = extractByLabel(html, fields.author);
	const publication = extractByLabel(html, fields.pub);
	const edition = extractByLabel(html, fields.edition);
	const description = extractByLabel(html, fields.description);
	const collection = extractByLabel(html, fields.collection);
	const summary = extractByLabel(html, fields.summary);
	const uniformTitle = extractByLabel(html, fields.uniformTitle);
	const isbn = extractByLabel(html, fields.isbn);

	// Extract image URL
	let imageUrl = '';
	const imgRegex = /<img[^>]*id="fitxa_imatge"[^>]*src="([^"]*)"[^>]*>/i;
	const imgMatch = html.match(imgRegex);
	if (imgMatch && imgMatch[1]) {
		imageUrl = imgMatch[1];
	} else {
		// Fallback: look for any img with portadesbd.diba.cat
		const fallbackRegex = /src="(https?:\/\/portadesbd\.diba\.cat[^"]*)"/i;
		const fallbackMatch = html.match(fallbackRegex);
		if (fallbackMatch && fallbackMatch[1]) {
			imageUrl = fallbackMatch[1];
		}
	}

	// Extract permanent link
	let permanentLink = '';
	const linkRegex = /<a[^>]*id="recordnum"[^>]*href="([^"]*)"[^>]*>/i;
	const linkMatch = html.match(linkRegex);
	if (linkMatch && linkMatch[1]) {
		permanentLink = linkMatch[1];
	}

	return {
		title,
		author,
		publication,
		edition,
		description,
		collection,
		summary,
		uniformTitle,
		isbn,
		imageUrl,
		permanentLink
	};
}

// Alternative regex-based library extraction (simpler)
export function extractBookStatus(html: string): BookStatus[] {
	const libraries: BookStatus[] = [];

	// Find the table content
	const tableMatch = html.match(/<table[^>]*class="bibItems"[^>]*>([\s\S]*?)<\/table>/i);
	if (!tableMatch) return libraries;

	const tableContent = tableMatch[1];

	// Find all library rows
	const rowRegex = /<tr[^>]*class="bibItemsEntry"[^>]*>([\s\S]*?)<\/tr>/gi;
	let rowMatch;

	while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
		const rowContent = rowMatch[1];

		// Extract cells
		const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
		const cells: string[] = [];
		let cellMatch;

		while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
			let cellContent = cellMatch[1];

			// Clean the cell content
			cellContent = decodeHtmlEntities(stripHtmlTags(cellContent)).trim();
			cells.push(cellContent);
		}

		if (cells.length >= 4) {
			// Extract link from first cell if present
			const linkMatch = rowContent.match(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/);

			const library: BookStatus = {
				location: cells[0] || '',
				locationLink: linkMatch ? linkMatch[1] : '',
				signature: cells[1] || '',
				status: cells[2] || '',
				notes: cells[3] || ''
			};

			libraries.push(library);
		}
	}

	return libraries;
}