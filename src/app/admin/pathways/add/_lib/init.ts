export const initDuration = (field: keyof Query['durations'], data: Query) => {
	data.durations[field] =
		!(field in data.durations) ?
			{
				min: 1,
				max: 1,
				separate: false,
			}
		:	data.durations[field]
	data.query[field] = !(field in data.query) ? { min: 0, max: 0, note: '' } : data.query[field]

	return data
}

export class ProcessDuration {
	note: string = ''
	min: {
		value: number
		base: number
	} = {
		value: 0,
		base: 1,
	}
	max: {
		value: number
		base: number
	} = {
		value: 0,
		base: 1,
	}
	seperateUom: boolean = false
	initialized: boolean = false

	queryData: Query['query'][keyof Query['durations']]
	durationData: Query['durations'][keyof Query['durations']]

	current: {
		type: 'query' | 'duration' | null
		key: 'min' | 'max' | 'note' | null
	} = {
		type: null,
		key: null,
	}

	queryKeys = ['min', 'max', 'note']

	constructor(
		public data: Query,
		public field: keyof Query['durations']
	) {
		this.queryData = this.initQuery(data)
		this.durationData = this.initDurations(data)
	}

	init(data: Query, field: keyof Query['durations']) {
		this.field = field
		this.initQuery(data)
		this.initDurations(data)

		return {
			...data,
			query: {
				...data.query,
				[this.field]: this.queryData,
			},
			durations: {
				...data.durations,
				[this.field]: this.durationData,
			},
		}
	}

	handleNote(text: string) {
		this.current = {
			type: 'query',
			key: 'note',
		}
		this.note = text
	}

	updateMin() {}
	updateMax() {}

	private initQuery(data: Query) {
		if (!data.query[this.field]) {
			this.max.value = 0
			this.min.value = 0
			this.note = ''
		} else {
			if (this.current.type == 'query') {
				this.queryKeys.forEach(key => {
					if (this.current.key == key) {
						return
					}
					if (key == 'min' || key == 'max') {
						this[key].value = data.query[this.field][key]
					} else {
						this.note = data.query[this.field].note
					}
				})
			} else {
				this.max.value = data.query[this.field].max
				this.min.value = data.query[this.field].min
				this.note = data.query[this.field].note
			}
		}
		return {
			min: this.min.value,
			max: this.max.value,
			note: this.note,
		}
	}

	private initDurations(data: Query) {
		if (!data.durations[this.field]) {
			this.max.base = 1
			this.min.base = 1
			this.seperateUom = false
		} else {
			this.max.base = data.durations[this.field].max
			this.min.base = data.durations[this.field].min
			this.seperateUom = data.durations[this.field].separate
		}
		return {
			min: this.min.base,
			max: this.max.base,
			separate: this.seperateUom,
		}
	}
}
