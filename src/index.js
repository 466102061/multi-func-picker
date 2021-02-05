import { merge } from './utils/utils.js'
import { Picker } from './core/picker.js'
import { setting, lang, pickerType } from './config/setting.js'

class MultiFuncPicker extends Picker{
	constructor(param, langParam = {}){
		let options = merge({}, setting, param);
		let langOptions = merge({}, lang, langParam);
		options.pickerType = pickerType;
		super(options, langOptions);
		this.maxWidth = Math.max(param.maxWidth, 375);
		return this;
	}
}

export default MultiFuncPicker;