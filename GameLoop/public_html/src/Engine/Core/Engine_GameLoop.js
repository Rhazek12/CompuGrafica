/*
 * File: EngineCore_Loop.js 
 * Implements the game loop functionality of gEngine
 */
/*jslint node: true, vars: true */
/*global gEngine: false, requestAnimationFrame: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.GameLoop = (function () {
    var kFPS = 60;          
    var kMPF = 1000 / kFPS; 

    var mPreviousTime = Date.now();
    var mLagTime;



    var mIsLoopRunning = false;

    var mMyGame = null;


    var _runLoop = function () {
        if (mIsLoopRunning) {

            requestAnimationFrame(function () { _runLoop.call(mMyGame); });


            var currentTime = Date.now();
            var elapsedTime = currentTime - mPreviousTime;
            mPreviousTime = currentTime;
            mLagTime += elapsedTime;

            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                this.update();      
                mLagTime -= kMPF;
            }


            this.draw();    
        }
    };


    var start = function (myGame) {
        mMyGame = myGame;


        mPreviousTime = Date.now();
        mLagTime = 0.0;


        mIsLoopRunning = true;

        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };



    var mPublic = {
        start: start
    };
    return mPublic;

}());