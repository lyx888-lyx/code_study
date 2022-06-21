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
          title: '教师管理'
        },
        children: [
          {
            path: 'home',
            name: 'TeacherHome',
            component: () => import('../components/Teacher/Main/TeacherMain'),
            meta: {
              title: '数据管理'
            }
          },
          {
            path: 'studentManager',
            name: 'studentManager',
            component: () => import('../components/Teacher/Manager/StudentManager'),
            meta: {
              title: '学生管理'
            }
          },
          {
            path: 'setting',
            name: 'Setting',
            component: () => import('../components/Teacher/Setting/Setting'),
            meta: {
              title: '个人中心'
            }
          },
          {
            path: 'classesManager',
            name: 'ClassesManager',
            component: () => import('../components/Teacher/Manager/ClassesManager'),
            meta: {
              title: '班级管理'
            }
          },
          {
            path: 'information',
            name: 'Information',
            component: () => import('../components/Teacher/Manager/Information'),
            meta: {
              title: '消息管理'
            }
          },
          {
            path: 'topicManager',
            name: 'TopicManager',
            component: () => import('../components/Teacher/Manager/TopicManager'),
            meta: {
              title: '题目管理'
            }
          },
          {
            path: 'taskManager',
            name: 'taskManager',
            component: () => import('../components/Teacher/Manager/TaskManager'),
            meta: {
              title: '任务管理'
            }
          }
        ]
      }
    ]
  }
]

const VueRouterPush = VueRouter.prototype.push
VueRouterPush.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
