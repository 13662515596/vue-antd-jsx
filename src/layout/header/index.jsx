import { Layout, Menu, Dropdown, Modal } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router' 
import { reactive, defineComponent, createVNode } from 'vue'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const Header = defineComponent({
    setup() {

        const store = useStore()
        const router = useRouter()
        const userInfo = reactive(store.state.user.userInfo)
        const menuClick = ({key}) => {
            switch(key){
                case 'quit':
                quit()
                break;
            }
        }

        const quit = () => {
            Modal.confirm({
                title: 'warning',
                icon: createVNode(ExclamationCircleOutlined),
                content: `quit?`,
                onOk() {
                    return new Promise((resolve) => {
                        setTimeout(()=>{
                            store.dispatch('user/logout')
                            resolve()
                            router.push({path: '/login'})
                        }, 1000);
                    })
                }
            })
        }

        const renderUser = () => {
            const slots = {
                overlay: () => (
                <Menu onClick={menuClick}>
                    <Menu.Item key="quit">
                        <span>quit</span>
                    </Menu.Item>
                </Menu>
                )
            }
            return <Dropdown v-slots={slots}>
                    <a class="ant-dropdown-link">
                        {userInfo.name??'userInfo.name'}<DownOutlined />
                    </a>
                </Dropdown>
        }

        return () => <Layout.Header class="header-user">
                {renderUser()}
            </Layout.Header>
    }
})
export default Header