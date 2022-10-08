<template>
    <div>
        <div class="bg">
            <div class="login-section">
                <div class="login-logo">
                    <img src="../../assets/images/login-section-logo.png" alt="">
                </div>
                <div class="form">
                    <el-form label-width="labelWidth" :rules="rules" :model="ruleForm" ref="ruleForm" status-icon>
                        <el-form-item prop="username">
                            <el-input v-model="ruleForm.username" placeholder="账户" autocomplete="off">
                                <i slot="prefix" class="icon-username"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="ruleForm.password" placeholder="密码" type="password" autocomplete="off">
                                 <i slot="prefix" class="icon-password"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <!-- <div class="item-operate">
                                <div class="item-one">
                                    <el-checkbox label="记住密码" v-model="isCheck"></el-checkbox>
                                </div>
                                <div class="item-one">
                                    <a href="javascript:;">忘记密码？</a>
                                </div>
                            </div> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm', $event)" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cookie from '../../utils/cookie.js'
import {checkLogin} from '../../apis/data.js'
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
             if(!value){
                return callback(new Error('用户名不能为空'))
            }else{
                callback();
            }
        }
        var validatePassword = (rule, value, callback) => {
            if(!value){
                return callback(new Error('密码不能为空'))
            }else{
                callback();
            }
        }
        return {
            labelWidth: '80px',
            ruleForm: {
                username: "",
                password: ""
            },
            isCheck: false,
            rules: {
                username: [
                    {
                        validator: validateUsername, trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: validatePassword, trigger: 'blur'
                    }
                ]
            },
            fullscreenLoading: false
        }
    },
    methods: {
        submitForm(formName, event){
            this.$refs[formName].validate((valid) => {
                const self = this;
                if(valid){
                    this.fullscreenLoading = true
                    //处理下记住密码的功能
                    const router = this.$router;
                    let username = this.ruleForm.username;
                    let password = this.ruleForm.password;
                    let isCheck = this.isCheck;
                    let accountInfo = username + '&' + password;
                    if(event && event.type == 'keydown' && event.keyCode != 13){
                        return;
                    }
                    
                    //执行请求，后台验证数据，写入cookie
                    let params = {
                        loginid: username,
                        loginpwd: password
                    }
                    checkLogin().then(function(res){
                        if(Number(res.data.status) === 200){
                            if(isCheck){
                                cookie.setCookie("accountInfo", accountInfo, 1440*3);
                            }else{
                                cookie.delCookie("accountInfo")
                            }
                            self.$message('登陆成功！')
                            self.$router.push('/');
                            self.fullscreenLoading = false;
                        }else if(Number(res.data.code) === -1){
                            self.$message.error('用户名或密码不正确！');
                            self.fullscreenLoading = false;
                            return false
                        }
                    })
                    
                }else{
                    return false;
                }
            })
        },
        loadAccountInfo(){
            let accountInfo = cookie.getCookie('accountInfo');
            if(!Boolean(accountInfo)){
                this.isCheck = false;
                return false;
            }else{
                this.ruleForm.username = accountInfo.split('&')[0];
                this.ruleForm.password = accountInfo.split('&')[1];
                this.isCheck = true;
            }
        }
    },
    mounted() {
        let self = this;
        this.loadAccountInfo();
        document.addEventListener('keydown', function(e){
            if(e.keyCode === 13){
            }
        })

    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .bg{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/logo_bacground.png) no-repeat;
        background-size: 100% 100%;
        min-height: 470px;
    }
    .login-section{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        height: 464px;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px 0px
        rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        opacity: 0.9;
        padding: 48px 80px 64px 80px;
    }
    .item-operate{
        display: flex;
        justify-content: space-between;
    .item-one{
    a{
        color: #2985f7;
    &:hover{
         text-decoration: underline;
     }
    }
    }
    }
    .el-form-item__content{
    .el-button--primary{
        width: 100%;
    }
    }
    .el-form{
    .el-form-item{
        margin-bottom: 30px;
    &:nth-child(3){
         margin-bottom: 24px;
         line-height: 12px;
     }
    &:nth-child(4){
         margin-bottom: 0px;
     }
    }
    }
    .icon-username{
        position: relative;
        top: 2px;
        left: 6px;
        display: inline-block;
        width: 12px;
        height: 13px;
        background: url(../../assets/images/account.png) no-repeat;
    }
    .icon-password{
        position: relative;
        top: -1px;
        left: 6px;
        display: inline-block;
        width: 15px;
        height: 8px;
        background: url(../../assets/images/password.png) no-repeat;
    }
    .login-logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 42px;
    }


</style>
