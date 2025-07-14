import functions


@click.group()
def cli():
    pass


@cli.command(help="List the changed files")
def ls():
    files = functions.ls()
    click.echo(files)


@cli.command(help="Upload a file")
@click.argument('file_name')
def upload(**kwargs):
    if functions.upload(kwargs['file_name']):
        click.echo('done.')
    else:
        click.echo(f'File {kwargs['file_name']} already exists')


if __name__ == '__main__':
    cli()