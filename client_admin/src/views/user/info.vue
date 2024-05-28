<template>
    <div class="warp" id="user_info">
        <el-row class="card">
            <el-col>
                <h1 class="text-center">
                    个人信息
                </h1>
            </el-col>
            <el-col>
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item label="头像">
                            <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                                action="" :http-request="uploadAvatar" :show-file-list="false">
                                <img v-if="form.avatar" :src="$fullUrl(form.avatar)" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item label="用户名" prop="username">
                            {{obj.username}}
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item prop="nickname" label="昵称">
                            <el-input v-model="form.nickname" :minlength="0" :maxlength="16" placeholder="" />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item label="用户组" prop="user_group">
                            {{obj.user_group}}
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item prop="phone" label="手机号码">
                            <el-input v-model="form.phone" :minlength="0" :maxlength="11"
                                placeholder="用户的手机号码，用于找回密码时或登录时" />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item label="状态" prop="state">
                            {{list_user_state.getVal("name",{"value": obj.state})}}
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                        <el-form-item prop="email" label="邮箱">
                            <el-input v-model="form.email" :minlength="0" :maxlength="64"
                                placeholder="用户的邮箱，用于找回密码时或登录时" />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
                        <el-form-item>
                            <el-button type="primary" @click="submit()">提交</el-button>
                            <el-button @click="cancel()">取消</el-button>
                            <router-link v-if="source_table && ($check_action(source_table_check_url,'get') || $check_action(source_table_check_url,'set'))" class="el-button float-right el-button--default el-button--primary"
                                         :to="source_table_url">详情
                            </router-link>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    import mixin from '@/mixins/page.js';

    export default {
        mixins: [mixin],
        components: {},
        data() {
            return {
                // 路径
                url_get_obj: "~/api/user/get_obj?",
                url_set: "~/api/user/set?",
                url_upload: "~/api/user/upload?",
                url_user_group_get_obj: "~/api/user_group/get_obj?",
                source_table: null,
                source_table_name: null,
                source_table_check_url: "",
                source_table_url:"",

                // 字段
                field: "user_id",

                // 查询
                query: {
                    "user_id": this.$store.state.user.user_id
                },

                // 表单
                form: {
                    user_id: this.$store.state.user.user_id,
                    username: "",
                    phone: "",
                    email: "",
                    nickname: "",
                    avatar: ""
                },

                list_user_state: [{
                    value: 1,
                    name: "可用"
                }, {
                    value: 2,
                    name: "异常"
                }, {
                    value: 3,
                    name: "已冻结"
                }, {
                    value: 4,
                    name: "已注销"
                }],

                // 校验规则
                rules: {
                    nickname: [{
                            required: true,
                            message: '昵称不能为空！',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 16,
                            message: '长度在 2 到 16 个字符',
                            trigger: 'blur'
                        }
                    ],
                    phone: [{
                        min: 11,
                        max: 11,
                        message: '长度为 11 个字符',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            /**
             * 上传封面图
             * @param {Object} param
             */
            uploadAvatar(param) {
                this.uploadFile(param.file, "avatar");
            },

            /**
             * @description 获取用户信息
             * @param {Function} func 回调函数
             */
            async submit_after(json, func){
                this.$get_user(() => {
                    if (this.oauth.signIn) {
                        if (this.user.user_id) {
                            // 执行获取权限并存储
                            this.$get_auth(this.user.user_group)
                            if (func) {
                                func(json);
                            }
                            this.$router.go(-1);
                        } else {
                            this.$router.push({
                                path: "/login"
                            })
                        }
                    } else {
                        if (func) {
                            func(json);
                        }
                        this.$router.go(-1);
                    }
                });
            },
            async get_obj_after(json, func){
                let user_group = this.$store.state.user.user_group;
                var json = await this.$get("~/api/user_group/get_obj?name="+user_group);
                if(json.result && json.result.obj){
                    if (json.result.obj.source_table) {
                        this.source_table = json.result.obj.source_table
                        this.source_table_name = user_group
                        this.source_table_check_url = "/"+this.source_table +"/view";
                        this.source_table_url = this.source_table_check_url+"?user_id=" +this.form.user_id
                    }
                }
            }
        },
        created() {}
    }
</script>


<style>
    #user_info .card {
        padding: 2rem 1rem;
    }

    #user_info .text-center {
        text-align: center;
    }

    #user_info .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    #user_info .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    #user_info .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    #user_info .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
