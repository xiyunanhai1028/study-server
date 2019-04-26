import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import CreateCurriculum from './views/teacherManagement/CreateCurriculum'
import newCurriculum from './views/newCurriculum/newCurriculum.vue'
import bankImport from './views/bankImport/bankImport.vue'
import teacher from './views/teacherManagement/teacher.vue'
import SetActivities from './views/SetActivities/SetActivities.vue'
import assignHomework from './views/assignHomework/assignHomework.vue'
import creatTeacher from './views/teacherManagement/creatTeacher'
import lunbotuList from './views/teacherManagement/lunbotuList'
import addScrollImage from './views/teacherManagement/addScrollImage'
import addVipOffline from './views/teacherManagement/addVipOffline'
import setActivity from './views/teacherManagement/setActivity'
import zuoylist from './views/assignHomework/zuoylist.vue'
import correcting from './views/assignHomework/correcting.vue'
let status= ''
let routes ;
if (sessionStorage.getItem('user')) {
    status = JSON.parse(sessionStorage.getItem('user')).status;
    // console.log(this.headers)
  }
//   alert(status)
  if (status === 3) {
     routes = [
        {
            path: '/login',
            component: Login,
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
        },
        {
            path: '/',
            component: Home,
            name: '管理员模块',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                // { path: '/main', component: Main, name: '主页', hidden: true },
                { path: '/teacher', component: teacher, name: '教师列表' },
                { path: '/creatTeacher', component: creatTeacher, name: '创建教师' },
                { path: '/lunbotuList', component: lunbotuList, name: '轮播图列表' },
                { path: '/addScrollImage', component: addScrollImage, name: '添加轮播图' },
                { path: '/addVipOffline', component: addVipOffline, name: '添加线下VIP' },
                { path: '/setActivity', component: setActivity, name: '设置活动' },
                { path: '/CreateCurriculum', component: CreateCurriculum, name: '创建课程', hidden: true },
            ]
        },        
        {
            path: '/',
            component: Home,
            name: '作业管理',
            iconCls: 'fa fa-address-card',
            children: [
                { path: '/assignHomework', component: assignHomework, name: '布置作业' },
                { path: '/zuoylist', component: zuoylist, name: '列表' },
                { path: '/correcting', component: correcting, name: '批改作业', hidden: true },
            ]
        }, 
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        }
    ];    
  }else {
     routes = [
        {
            path: '/login',
            component: Login,
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
        },
        //{ path: '/main', component: Main },
        {
            path: '/',
            component: Home,
            name: '管理员模块',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                // { path: '/main', component: Main, name: '主页', hidden: true },
                { path: '/teacher', component: teacher, name: '教师列表' },
                { path: '/creatTeacher', component: creatTeacher, name: '创建教师' },
                { path: '/lunbotuList', component: lunbotuList, name: '轮播图列表' },
                { path: '/addScrollImage', component: addScrollImage, name: '添加轮播图' },
                { path: '/addVipOffline', component: addVipOffline, name: '添加线下VIP' },
                { path: '/setActivity', component: setActivity, name: '设置活动' },
                { path: '/CreateCurriculum', component: CreateCurriculum, name: '创建课程', hidden: true },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '作业管理',
            iconCls: 'fa fa-address-card',
            children: [
                { path: '/assignHomework', component: assignHomework, name: '布置作业' },
                { path: '/zuoylist', component: zuoylist, name: '列表' },
                { path: '/correcting', component: correcting, name: '批改作业', hidden: true },
            ]
        },         
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        }
    ];
  }

export default routes;