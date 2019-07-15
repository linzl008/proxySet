<template>
    <div class="proxy width100p">
        <el-header>
            <div class="header">代理列表</div>
            <div class="btns">
                <el-button type="primary" size="small" icon="el-icon-refresh" @click="reset">刷新配置</el-button>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addProxy">新增代理</el-button>
            </div>
        </el-header>
        <el-table :data="lists">
            <el-table-column  label="序号" type="index"></el-table-column>
            <el-table-column  label="请求接口" prop="src"></el-table-column>
            <el-table-column  label="代理服务器" prop="target"></el-table-column>
            <el-table-column  label="是否需要跨域" prop="changeOrigin">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.changeOrigin?'是':'否'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column  label="操作" prop="changeOrigin">
                <template slot-scope="scope">
                    <el-button type="text" @click="editProxy(scope.row,scope.$index)">编辑</el-button>
                    <el-button type="text" @click="deleteProxy(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <editDialog :visible="editVisible" :lists="lists" :form="form" @submit="submitProxy" @close="editVisible=false"></editDialog>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/proxy/proxy.scss';
</style>

<script>

    import { mapGetters } from 'vuex';
    import { getProxyList , resetProxy , updateProxyList} from "../../api/proxy";
    import editDialog from '@/components/proxy/editDialog'
    export default {
        name: "proxy",
        data() {
            return {
                editVisible:false,
                form:{}
            };
        },
        computed: {
            ...mapGetters(
                { lists:'proxy/getProxyList' },
            )
        },
        components:{
          editDialog
        },
        watch: {
        },
        created() {
        },
        mounted() {
            this.getProxyList()
        },
        methods: {
            getProxyList(){
                getProxyList().then(res=>{
                    if(res.code === 200){
                        this.$store.dispatch('proxy/setProxyList',res.data)
                    }else{
                        this.$message.error('获取代理列表失败')
                    }
                })
            },
            addProxy(){
                this.form = {
                    src:"",
                    target:"",
                    changeOrigin:true,
                    index: -1
                };
                this.editVisible = true
            },
            editProxy(row,index){
                this.form = { ...row ,index};
                this.editVisible = true
            },
            deleteProxy(row,index){
                let lists = JSON.parse(JSON.stringify(this.lists));
                lists.splice(index,1);
                this.submitProxy({lists})
            },
            submitProxy(params){
                updateProxyList(params).then(res=>{
                    if(res.code === 200){
                        this.$message.success('操作成功');
                        this.editVisible = false;
                        this.getProxyList();
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            reset(){
                resetProxy().then(res=>{
                    if(res.code === 200){
                        this.$message.success(res.message)
                    }
                });
            }
        }

    };
</script>
