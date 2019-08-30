import chalk from 'chalk';

export default function errorHandle(err, _, res, next) {
  if (err) {
    res.status(500).json({
      message: 'An internal server error occured',
    });
    console.log(chalk.red(`Internal server error occcured : ${err}`));
  } else {
    next();
  }
}
