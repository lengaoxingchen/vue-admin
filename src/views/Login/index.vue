<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li
                        v-for="item in menuTab"
                        :key="item.id"
                        :class="{ current: item.current }"
                        @click="toggleMenu(item)"
                >
                    {{ item.txt }}
                </li>
            </ul>
            <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    class="login-form"
                    size="medium"
            >
                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input
                            type="text"
                            v-model="ruleForm.username"
                            autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input
                            type="text"
                            v-model="ruleForm.password"
                            autocomplete="off"
                            minlength="6"
                            maxlength="20"
                    ></el-input>
                </el-form-item>

                <el-form-item
                        prop="passwords"
                        class="item-form"
                        v-if="model === 'register'"
                >
                    <label>重复密码</label>
                    <el-input
                            type="text"
                            v-model="ruleForm.passwords"
                            autocomplete="off"
                            minlength="6"
                            maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input
                                    v-model.number="ruleForm.code"
                                    minlength="6"
                                    maxlength="6"
                            ></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button
                            type="danger"
                            @click="submitForm('ruleForm')"
                            class="login-btn block"
                            :disabled="loginButtonStatus"
                    >{{model == 'login'?'登录':'注册'}}
                    </el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {
        stripscript,
        validateEmail,
        validatePass,
        validateVCode
    } from '@/utils/validate';

    import {onMounted, reactive, ref} from '@vue/composition-api'
    import {GetSms} from '@/api/login';

    export default {
        name: "index",
        setup(props, {refs, root}) {
            const validateUsername = (rule, value, callback) => {
                // eslint-disable-next-line no-useless-escape
                if (value === "") {
                    callback(new Error("请输入邮箱"));
                } else if (validateEmail(value)) {
                    callback(new Error("邮箱格式有误"));
                } else {
                    callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                ruleForm.password = stripscript(value);
                value = ruleForm.password;
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位字母+数字"));
                } else {
                    callback();
                }
            };

            const validatePasswords = (rule, value, callback) => {
                if (model.value === 'login') {
                    callback();
                }
                ruleForm.passwords = stripscript(value);
                value = ruleForm.passwords;
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== ruleForm.password) {
                    callback(new Error("重复密码不正确"));
                } else {
                    callback();
                }
            };
            const validateCode = (rule, value, callback) => {
                ruleForm.code = stripscript(value);
                value = ruleForm.code;
                if (value === "") {
                    return callback(new Error("验证码不能为空"));
                } else if (validateVCode(value)) {
                    return callback(new Error("验证码格式不正确"));
                } else {
                    callback();
                }
            };

            const menuTab = reactive([
                {txt: "登录", current: true, type: "login"},
                {txt: "注册", current: false, type: "register"}
            ]);


            const model = ref('login');

            const loginButtonStatus = ref(true);

            const ruleForm = reactive({
                username: "",
                password: "",
                passwords: "",
                code: ""
            });

            const rules = reactive({
                username: [{validator: validateUsername, trigger: "blur"}],
                password: [{validator: validatePassword, trigger: "blur"}],
                passwords: [{validator: validatePasswords, trigger: "blur"}],
                code: [{validator: validateCode, trigger: "blur"}]
            });

            const
                toggleMenu =
                    (data => {
                        menuTab.forEach(elem => {
                            elem.current = false;
                        });
                        data.current = true;

                        model.value = data.type;
                    });

            const getSms = (() => {
                if (ruleForm.username == '') {
                    root.$message.error('邮箱不能为空！！');
                    return false
                }
                if (validateEmail(ruleForm.username)){
                    root.$message.error('邮箱格式不正确,请重新输入!!');
                    return false
                }
                GetSms({
                    username: ruleForm.username
                }).then(response => {

                }).catch(error=>{

                });
            });

            const submitForm =
                (formName => {
                    refs[formName].validate(valid => {
                        if (valid) {
                            alert("submit!");
                        } else {
                            console.log("error submit!!");
                            return false;
                        }
                    });
                });

            onMounted(() => {

            });

            return {
                menuTab,
                model,
                toggleMenu,
                submitForm,
                rules,
                ruleForm,
                getSms,
                loginButtonStatus
            }
        }
    };
</script>

<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #344a5f;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }

        .current {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .login-form {
        margin-top: 29px;

        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }

        .item-form {
            margin-bottom: 13px;
        }

        .block {
            width: 100%;
            display: block;
        }

        .login-btn {
            margin-top: 19px;
        }
    }
</style>
