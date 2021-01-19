#import "DialogViewController.h"

@interface DialogViewController ()

@property (nonatomic, strong) NSString* alertText;

@end

@implementation DialogViewController


- (instancetype)initWithAlertText:(NSString*)text
{
    if(!self)
        self = [super init];
    self.alertText = text;
    return self;
}

- (void)viewDidLoad {
    dispatch_async(dispatch_get_main_queue(), ^{
        [super viewDidLoad];
        self.view.backgroundColor = [UIColor whiteColor];
        self.modalPresentationStyle = UIModalPresentationFullScreen;
        self.popoverPresentationController.backgroundColor = [UIColor whiteColor];
        
        UILabel* lblInfo = [[UILabel alloc] init];
        lblInfo.numberOfLines = 5;
        lblInfo.text = self.alertText;
        lblInfo.textColor = [UIColor blackColor];
        [self.view addSubview:lblInfo];
        
        UIButton* btnClose = [[UIButton alloc] init];
        [btnClose setTitle:@"Close" forState:UIControlStateNormal];
        [btnClose setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
        [btnClose addTarget:self action:@selector(closeAlert) forControlEvents:UIControlEventTouchUpInside];
        [self.view addSubview:btnClose];
        
        [lblInfo setTranslatesAutoresizingMaskIntoConstraints:NO];
        [btnClose setTranslatesAutoresizingMaskIntoConstraints:NO];
        NSDictionary *viewsDictionary = @{@"lblInfo":lblInfo, @"btnClose":btnClose};
        NSArray *c = [NSLayoutConstraint constraintsWithVisualFormat:@"|-[lblInfo]-|" options:0 metrics:nil views:viewsDictionary];
        [self.view addConstraints:c];
        c = [NSLayoutConstraint constraintsWithVisualFormat:@"|-[btnClose]-|" options:0 metrics:nil views:viewsDictionary];
        [self.view addConstraints:c];
        c = [NSLayoutConstraint constraintsWithVisualFormat:@"V:|-(40)-[lblInfo]-[btnClose]" options:0 metrics:nil views:viewsDictionary];
        [self.view addConstraints:c];
    });
}

- (void)closeAlert
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end
