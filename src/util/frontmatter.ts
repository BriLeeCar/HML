export const processFrontmatter = (source: string) => {
	const fmTest = source.match(/---\n([\s\S]*?)\n---/);
	if (fmTest) {
		const fmEntries = fmTest[1] && new Frontmatter(fmTest[1]).entries;
		return fmEntries ? Object.assign({}, fmEntries) : {};
	} else {
		return {};
	}
};

class Frontmatter {
	entries: { [key: string]: any } = {};
	constructor(match: string) {
		match
			.trim()
			.replace(/---/g, '')
			.split('\n')
			.forEach((line) => {
				const [key, value] = line.split(':').map((part) => part.trim());
				Object.assign(this.entries, { [key]: null });
				this.getTags(key, value);
			});
		Object.keys(this.entries).forEach((key) => {
			if (this.entries[key] === null) {
				delete this.entries[key];
			}
		});
	}

	getTags = (key: string, values: string) => {
		if (key == 'tags') {
			const ea = this.parseValueArray(values);
			const base = (Array.isArray(ea) ? ea : [ea]).map((item) =>
				item.split('/'),
			);
			const keys = base.map((item) => item[0].trim());
			keys.forEach((item) => {
				base
					.filter((ea) => ea[0].trim() == item)
					.forEach((ea) => {
						if (this.entries[item]) {
							if (Array.isArray(this.entries[item])) {
								!this.entries[item].includes(ea[1].trim()) &&
									this.entries[item].push(ea[1].trim());
							} else {
								this.entries[item] = ea[1]
									? [this.entries[item], ea[1]?.trim()]
									: this.entries[item];
							}
						} else if (ea[1]) {
							this.entries[item] = ea[1].trim();
						}
					});
			});
		} else {
			this.entries[key] = this.parseValueArray(values);
		}
	};

	parseValueArray = (value: string) => {
		if (value.includes(',')) {
			return value.split(',').map((item) => item.trim());
		}
		return value.trim();
	};
}
