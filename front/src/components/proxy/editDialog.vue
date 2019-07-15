<template>
    <el-dialog class="proxy" title="编辑" width="600px" :visible.sync="visible" :before-close="close" :close-on-click-modal="false">
        <form class="dialog">
            <ul>
                <li>
                    <i v-require>请求接口</i>
                    <el-input type="text" v-model="edit.src" clearable placeholder="请输入说明"></el-input>
                </li>
                <li>
                    <i v-require>代理服务器</i>
                    <el-input type="text" v-model="edit.target" clearable placeholder="请输入说明"></el-input>
                </li>
                <li>
                    <i v-require>是否需要跨域</i>
                    <el-radio-group v-model="edit.changeOrigin">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </li>
            </ul>
        </form>
        <div slot="footer" class="pop_btns">
            <el-button @click="close">取消</el-button>
            <el-button @click="submit" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "editDialog",
        props: {
            lists:Array,
            form: Object,
            visible:Boolean
        },
        data(){
            return {
                edit:{}
            }
        },
        watch: {
            form(newValue, oldValue) {
                this.edit = {...newValue}
            }
        },
        methods: {
            submit() {
                let lists = JSON.parse(JSON.stringify(this.lists));
                if(this.edit.index>=0){
                    lists[this.edit.index].src = this.edit.src;
                    lists[this.edit.index].target = this.edit.target;
                    lists[this.edit.index].changeOrigin = this.edit.changeOrigin;
                }else{
                    lists.unshift({
                        src: this.edit.src,
                        target: this.edit.target,
                        changeOrigin: this.edit.changeOrigin
                    })
                }
                this.$emit('submit',{lists})
            },
            close() {
                this.$emit('close')
            }
        },
    }
</script>

<style lang="scss" scoped>
 @import "../../assets/css/proxy/proxy.scss";
</style>