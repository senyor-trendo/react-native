export default async function doSearch(text: string): Promise<string> {
	const searchQuery = encodeURIComponent(text.trim());
	const url = `https://aladi.diba.cat/search~S22*cat/?searchtype=X&searcharg=${searchQuery}&searchscope=22&sortdropdown=-&SORT=DZ&extended=0&SUBMIT=Cerca`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.text();
}