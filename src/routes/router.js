import { Router as expressRouter } from 'express';
import passport from "passport";

export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    };


    get(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

    post(path, policies, ...callbacks) {
        this.router.post(
            path,
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }


    put(path, policies, ...callbacks) {
        this.router.put(
            path,
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(
            path,
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

     handlePolicies = (policies) => (req, res, next) => {
        if (policies[0] === 'PUBLIC') {
          return next();
        }
      
        passport.authenticate('jwt', { session: false })(req, res, (err) => {
          if (err) {
            return next(err);
          }
      
          if (!req.user) {
            return res.status(401).json({ message: 'No token provided' });
          }
      
          if (!policies.includes(req.user.role.toUpperCase())) {
            return res.status(403).json({ message: 'Forbidden' });
          }
      
          next();
        });
      };


    generateCustomReponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data });
        };
        res.sendServerError = (error) => {
            res.status(500).json({ error });
        };
        res.sendClientError = (error) => {
            res.status(400).json({ error });
        };

        next();
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                params[1].status(500).json({ error: error.message });
            }
        })
    }
}