// base
import gulp from "gulp";
import rename from "gulp-rename";
import gulpSequence from "gulp-sequence";
import del from "del";
import gulpif from "gulp-if";
import {exec} from "child_process";
import {create} from "browser-sync";
const browserSync = create();
// html
import inject from "gulp-inject";
import htmlmin from "gulp-htmlmin";
import bowerFiles from "main-bower-files"
import mergeTemplate from "gulp-angular-templatecache";

// js && css plugins
import concat from "gulp-concat";

// js plugins
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import jshint from "gulp-jshint";
import stripDebug from "gulp-strip-debug";  // Strip console, alert, and debugger statements from JavaScript code with strip-debug

// css plugins
import cssmin from "gulp-cssmin";

// projectConfig
import {projectConfig, libs} from "./package.json";
const client = projectConfig.client;
/*exec( 'cp ./index.html ./app' , function(err, stdout , stderr ) {
 console.log( stdout,stderr);
 });*/
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';

/* *
 * 压缩合并css
 * */
gulp.task("autoprefixer",
    ()=>
        gulp.src(client.css.src)
        //.pipe(sourcemaps.init())
            .pipe(postcss([autoprefixer()]))
            .pipe(cssmin())
            // .pipe(concat({path: "all.min.css"}))
            //.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(client.css.dest))
);
/* *
 * 清空之前代码
 * */
gulp.task("clean",
    ()=>
        del(["dist"])
);
/* *
 * 检验、转义、压缩js
 */
gulp.task("transPileJs",
    ()=>
        gulp.src(client.js.src)
            .pipe(jshint())
            .pipe(jshint.reporter())
            // .pipe(sourcemaps.init())
            .pipe(babel())
            /*.pipe(uglify({
             // 混淆压缩参数配置
             mangle: {
             toplevel: true
             }
             }))
             .pipe(sourcemaps.write('.'))*/
            .pipe(gulp.dest(client.js.dest))
);

/* *
 * 将生成后的文件注入到'./dist/index.html'
 * */
gulp.task("devIndex", ()=>
    gulp.src("./index.source.html")
        .pipe(inject(gulp.src(bowerFiles()), {relative: true, name: 'bower'}))
        // .pipe(inject(gulp.src(libs)),{relative:true})
        .pipe(inject(gulp.src(["./dist/**/*.js", "./dist/**/*.css", "!./dist/libs/*.js", "!./dist/libs/*.css"]), {relative: true}))
        //.pipe(inject(gulp.src(["./dist/libs/*.js","./dist/libs/*.css"]),{relative:true},{name:"bower"}))
        .pipe(rename({basename:"index"}))
        .pipe(gulp.dest("./"))
);
/* *
 * 生成模板文件
 * */
gulp.task("mergeTemplate",
    ()=>gulp.src("./app/view/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
            ,removeComments:true
        }))
        .pipe(mergeTemplate({
            module: "myApp"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/view/"))
);
/* *
 * 开启事件监听
 * */
gulp.task("watch", ()=> {
    browserSync.init({
        server: {
            baseDir: ".",
            index:"./index.html"
        }
    });
    // 数据，生成JS、生成css、注入到首页、监听事件
    gulpSequence("clean", ["transPileJs", "autoprefixer", "mergeTemplate"], "devIndex")();
    gulp.watch(client.js.src, ["transPileJs","devIndex"]);
    gulp.watch(client.css.src, ["autoprefixer","devIndex"]);
    gulp.watch(client.template.src,["mergeTemplate","devIndex"]);
    // 监听生成文件，实现热更新
    gulp.watch("./dist/**/*.*").on("change",browserSync.reload);
});