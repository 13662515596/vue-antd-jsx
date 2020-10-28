import { defineComponent, ref } from 'vue'
import './index.scss'
export default defineComponent({
    setup() {
        const message = ref('home')

        const renderPage = () => {
            return <h1>{message.value}</h1>
        }
        return () => <>{renderPage()}</>
    }
})