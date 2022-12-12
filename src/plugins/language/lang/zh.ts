import { getMessage } from '../index'
const modules = import.meta.globEager('./zh_CN/**/*.ts')
export default {
    zh_CN: {
      ...getMessage(modules, 'zh_CN'),
    },
}