import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/studyAdmin',
    name: 'studyAdmin',
    component: () => import('../views/Admin/Login')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/Student/Index'),
    redirect: '/student/main',
    children: [
      {
        path: 'main',
        name: 'StudentMain',
        component: () => import('../components/Student/Home')
      },
      {
        path: 'info',
        name: 'StudentInfo',
        component: () => import('../components/Student/Info/StudentInfo'),
        redirect: '/info/data',
        children: [
          {
            path: 'data',
            name: 'StudentData',
            component: () => import('../components/Student/Info/StudentData'),
            meta: {
              index: 0
            }
          },
          {
            path: 'safety',
            name: 'StudentSafety',
            component: () => import('../components/Student/Info/StudentSafety'),
            meta: {
              index: 1
            }
          }
        ]
      },
      {
        path: 'task',
        name: 'StudentTask',
        component: () => import('../components/Student/StudentTask/StudentTask')
      },
      {
        path: 'topic',
        name: 'StudentTopic',
        component: () => import('../components/Student/Topic/StudentTopic')
      },
      {
        path: 'taskCenter',
        name: 'StudentTask',
        component: () => import('../components/Student/TaskCenter/TaskCenter')
      },
      {
        path: 'myClass',
        name: 'MyClass',
        component: () => import('../components/Student/MyClass/MyClass')
      },
      {
        path: 'myMessage',
        name: 'Message',
        component: () => import('../components/Student/Message/Message')
      }
    ]
  },
  {
    path: '/teacher',
    name: 'TeacherIndex',
    component: () => import('../views/Teacher/Index'),
    redirect: '/teacher/main/home',
    children: [
      {
        path: 'main',
        name: 'TeacherMain',
        component: () => import('../components/Teacher/Home'),
        redirect: '/teacher/main/home',
        meta: {
          title: '????????????'
        },
        children: [
          {
            path: 'home',
            name: 'TeacherHome',
            component: () => import('../components/Teacher/Main/TeacherMain'),
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'studentManager',
            name: 'studentManager',
            component: () => import('../components/Teacher/Manager/StudentManager'),
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'setting',
            name: 'Setting',
            component: () => import('../components/Teacher/Setting/Setting'),
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'classesManager',
            name: 'ClassesManager',
            component: () => import('../components/Teacher/Manager/ClassesManager'),
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'information',
            name: 'Information',
            component: () => import('../components/Teacher/Manager/Information'),
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'topicManager',
            name: 'TopicManager',
            component: () => import('../components/Teacher/Manager/TopicManager'),
            meta: {
              title: '????????????'
            }
          },
          {
            path: 'taskManager',
            name: 'taskManager',
            component: () => import('../components/Teacher/Manager/TaskManager'),
            meta: {
              title: '????????????'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/adminStudyVue',
    name: 'AdminStudy',
    component: () => import('../views/Admin/Index'),
    redirect: '/adminStudyVue/main/home',
    children: [
      {
        path: 'main',
        name: 'AdminMain',
        component: () => import('../components/Admin/Home'),
        meta: {
          title: '???????????????'
        },
        redirect: '/adminStudyVue/main/home',
        children: [
          {
            path: 'home',
            name: 'AdminHome',
            component: () => import('../components/Admin/Main/AdminMain'),
            meta: {
              title: '???????????????'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/teacherRegister',
    name: 'TeacherRegister',
    component: () => import('../components/Register/TeacherRegister')
  }
]

const VueRouterPush = VueRouter.prototype.push
VueRouterPush.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else if (to.path === '/teacherRegister') {
    next();
  }
  const tokenStr = window.localStorage.getItem('token')
  // ??????????????????
  if (!tokenStr && to.path !== '/login' && to.path !== '/teacherRegister') return next('/login')
  next()
})
/**
 * ??????????????????????????????????????????F5
 */
router.afterEach((to,from)=>{
  if(from.path !== '/' && from.path !== '/' && to.path === '/'){
    window.location.reload();
  }
})

export default router
